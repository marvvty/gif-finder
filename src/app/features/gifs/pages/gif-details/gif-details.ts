import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { GiphyApi } from '../../services/giphy-api';
import { NgIcon } from '@ng-icons/core';
import { lucideLoader, lucideDownload, lucideShare } from '@ng-icons/lucide';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'gfd-gif-details',
  templateUrl: './gif-details.html',
  styleUrls: ['./gif-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, Button, DatePipe],
})
export class GifDetails {
  private readonly api = inject(GiphyApi);
  readonly id = input.required<string>();

  readonly svg = { lucideLoader, lucideDownload, lucideShare };

  protected readonly item = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.getGifById(id),
  });

  protected formatSize(size: number): string {
    if (!size) return '-';

    const mb = size / 1024 / 1024;
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(size / 1024)} KB`;
  }

  protected share(): void {
    navigator.clipboard.writeText(this.item.value()?.originalUrl || '');
  }

  protected async download(): Promise<void> {
    const gif = this.item.value();

    if (!gif) return;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(
      await fetch(gif.originalUrl).then((res) => res.blob()),
    );
    link.download = `${gif.id}.gif`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
