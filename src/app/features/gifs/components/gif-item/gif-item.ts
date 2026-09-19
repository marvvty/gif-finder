import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Gif } from '../../models/giphy-mapper';
import { lucideLink } from '@ng-icons/lucide';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'gfd-gif-item',
  templateUrl: './gif-item.html',
  styleUrls: ['./gif-item.scss'],
  imports: [RouterLink, NgIcon, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifItem {
  readonly gif = input.required<Gif>();

  protected readonly svg = lucideLink;

  protected copyLinkToClipboard(): void {
    navigator.clipboard.writeText(this.gif().originalUrl);
  }
}
