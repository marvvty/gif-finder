import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GifList } from '../../components/gif-list/gif-list';
import { GiphyApi } from '../../services/giphy-api';
import { Gif, GifPage } from '../../models/giphy-mapper';
import {
  DEFAULT_QUERY,
  MAX_OFFSET,
  PAGE_SIZE,
} from '../../models/giphy.constant';
import { Button } from '../../../../shared/ui/button/button';
import { State } from '../../../../shared/ui/state/state';

@Component({
  selector: 'gfd-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [GifList, Button, State],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly api = inject(GiphyApi);

  readonly q = input('', {
    transform: (value: string | undefined) => value ?? '',
  });

  private readonly query = computed(() => this.q().trim() || DEFAULT_QUERY);

  private readonly offset = linkedSignal({
    source: this.query,
    computation: () => 0,
  });

  protected readonly page = rxResource({
    params: () => ({ query: this.query(), offset: this.offset() }),
    stream: ({ params }) =>
      this.api.searchGifs(params.query, PAGE_SIZE, params.offset),
  });

  protected readonly gifs = linkedSignal<GifPage | undefined, Gif[]>({
    source: () => (this.page.hasValue() ? this.page.value() : undefined),
    computation: (page, previous) => {
      const loaded = previous?.value ?? [];

      if (!page) {
        return loaded;
      }

      if (page.offset === 0) {
        return page.items;
      }

      const loadedIds = new Set(loaded.map((gif) => gif.id));

      return [...loaded, ...page.items.filter((gif) => !loadedIds.has(gif.id))];
    },
  });

  private readonly totalCount = linkedSignal<GifPage | undefined, number>({
    source: () => (this.page.hasValue() ? this.page.value() : undefined),
    computation: (page, previous) => page?.totalCount ?? previous?.value ?? 0,
  });

  protected readonly isEmpty = computed(() => this.gifs().length === 0);

  protected readonly emptyMessage = computed(
    () => `Nothing found for "${this.query()}"`,
  );

  protected readonly hasMore = computed(
    () =>
      this.gifs().length < this.totalCount() &&
      this.offset() + PAGE_SIZE <= MAX_OFFSET,
  );

  protected loadMore(): void {
    this.offset.update((offset) => offset + PAGE_SIZE);
  }
}
