import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgIcon } from '@ng-icons/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GiphyApi, GiphyPage } from '../../services/giphy-api';
import { lucideLoader } from '@ng-icons/lucide';
import { Button } from '../../../../shared/ui/button/button';
import { DEFAULT_QUERY, PAGE_SIZE } from '../../models/giphy.constant';
import { Gif } from '../../models/giphy-mapper';

@Component({
  selector: 'gfd-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [GifList, NgIcon, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly api = inject(GiphyApi);

  protected readonly svg = lucideLoader;

  readonly q = input('');
  protected readonly query = computed(() => this.q()?.trim() || DEFAULT_QUERY);

  protected readonly offset = linkedSignal({
    source: this.query,
    computation: () => 0,
  });

  protected readonly page = rxResource({
    params: () => ({ query: this.query(), offset: this.offset() }),
    stream: ({ params }) =>
      this.api.searchGifs(params.query, PAGE_SIZE, params.offset),
  });

  private readonly loadedPage = computed(() =>
    this.page.hasValue() ? this.page.value() : undefined,
  );

  protected readonly gifs = linkedSignal<GiphyPage | undefined, Gif[]>({
    source: this.loadedPage,
    computation: (page, prev) => {
      const accumulated = prev?.value ?? [];

      if (!page) return accumulated;

      return page.offset === 0 ? page.items : [...accumulated, ...page.items];
    },
  });

  protected readonly totalCount = linkedSignal<GiphyPage | undefined, number>({
    source: this.loadedPage,
    computation: (page, previous) => page?.totalCount ?? previous?.value ?? 0,
  });

  protected readonly hasMore = computed(
    () => this.gifs().length > 0 && this.gifs().length < this.totalCount(),
  );

  protected loadMore(): void {
    if (this.page.isLoading()) return;
    this.offset.update((offset) => offset + PAGE_SIZE);
  }
}
