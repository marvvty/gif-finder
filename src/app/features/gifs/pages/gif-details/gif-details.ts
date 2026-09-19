import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgIcon } from '@ng-icons/core';
import { lucideCheck, lucideDownload, lucideShare } from '@ng-icons/lucide';
import { GiphyApi } from '../../services/giphy-api';
import { Button } from '../../../../shared/ui/button/button';
import { State } from '../../../../shared/ui/state/state';
import { FileSizePipe } from '../../../../shared/pipes/file-size';
import { ClipboardService } from '../../../../shared/services/clipboard';
import { FileDownloadService } from '../../../../shared/services/file-download';

const COPIED_FEEDBACK_MS = 2000;
const MISSING_GIF_STATUSES = [400, 404];

@Component({
  selector: 'gfd-gif-details',
  templateUrl: './gif-details.html',
  styleUrls: ['./gif-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, Button, State, DatePipe, FileSizePipe],
})
export class GifDetails {
  private readonly api = inject(GiphyApi);
  private readonly clipboard = inject(ClipboardService);
  private readonly fileDownload = inject(FileDownloadService);

  readonly id = input.required<string>();

  protected readonly downloadIcon = lucideDownload;
  protected readonly shareIcon = lucideShare;
  protected readonly checkIcon = lucideCheck;

  protected readonly gif = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.getGifById(id),
  });

  protected readonly isNotFound = computed(() => {
    const error = this.gif.error();

    return (
      error instanceof HttpErrorResponse &&
      MISSING_GIF_STATUSES.includes(error.status)
    );
  });

  protected readonly isCopied = signal(false);
  protected readonly hasFailedDownload = signal(false);

  protected readonly shareLabel = computed(() =>
    this.isCopied() ? 'Copied' : 'Share',
  );

  protected async share(): Promise<void> {
    if (!this.gif.hasValue()) {
      return;
    }

    const copied = await this.clipboard.copy(this.gif.value().originalUrl);

    if (!copied) {
      return;
    }

    this.isCopied.set(true);
    setTimeout(() => this.isCopied.set(false), COPIED_FEEDBACK_MS);
  }

  protected async download(): Promise<void> {
    if (!this.gif.hasValue()) {
      return;
    }

    const gif = this.gif.value();
    const started = await this.fileDownload.download(
      gif.originalUrl,
      `${gif.id}.gif`,
    );

    this.hasFailedDownload.set(!started);
  }
}
