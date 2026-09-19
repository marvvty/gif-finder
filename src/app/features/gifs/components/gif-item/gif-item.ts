import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { lucideCheck, lucideLink } from '@ng-icons/lucide';
import { Gif } from '../../models/giphy-mapper';
import { Button } from '../../../../shared/ui/button/button';
import { ClipboardService } from '../../../../shared/services/clipboard';

const COPIED_FEEDBACK_MS = 2000;

@Component({
  selector: 'gfd-gif-item',
  templateUrl: './gif-item.html',
  styleUrls: ['./gif-item.scss'],
  imports: [RouterLink, NgIcon, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifItem {
  private readonly clipboard = inject(ClipboardService);

  readonly gif = input.required<Gif>();

  protected readonly linkIcon = lucideLink;
  protected readonly checkIcon = lucideCheck;

  protected readonly isCopied = signal(false);
  protected readonly copyLabel = computed(() =>
    this.isCopied() ? 'Link copied' : 'Copy link',
  );

  protected async copyLink(): Promise<void> {
    const copied = await this.clipboard.copy(this.gif().originalUrl);

    if (!copied) {
      return;
    }

    this.isCopied.set(true);
    setTimeout(() => this.isCopied.set(false), COPIED_FEEDBACK_MS);
  }
}
