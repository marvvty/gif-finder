import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NgIcon } from '@ng-icons/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GiphyApi } from '../../services/giphy-api';
import { lucideLoader } from '@ng-icons/lucide';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'gfd-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [GifList, NgIcon, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly api = inject(GiphyApi);
  private readonly route = inject(ActivatedRoute);

  protected readonly svg = lucideLoader;

  protected readonly query = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('q')?.trim() ?? '')),
    { initialValue: '' },
  );

  protected readonly gifs = rxResource({
    params: () => this.query(),
    stream: ({ params: q }) =>
      q ? this.api.searchGifs(q) : this.api.searchGifs('cat'),
    defaultValue: [],
  });
}
