import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Gif } from '../../models/giphy-mapper';
import { GifItem } from '../gif-item/gif-item';

@Component({
  selector: 'gfd-gif-list',
  templateUrl: './gif-list.html',
  styleUrls: ['./gif-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GifItem],
})
export class GifList {
  readonly gifs = input<Gif[]>();
}
