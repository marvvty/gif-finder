import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { GiphyApi } from './giphy-api';
import { GifPage } from '../models/giphy-mapper';

const searchResponse = {
  data: [],
  pagination: { total_count: 500, count: 0, offset: 50 },
};

describe('GiphyApi', () => {
  let api: GiphyApi;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    api = TestBed.inject(GiphyApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('sends the query, the paging window and a safe rating', () => {
    api.searchGifs('dog', 25, 50).subscribe();

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.apiUrl}/search`,
    );

    expect(request.request.params.get('q')).toBe('dog');
    expect(request.request.params.get('limit')).toBe('25');
    expect(request.request.params.get('offset')).toBe('50');
    expect(request.request.params.get('rating')).toBe('pg');

    request.flush(searchResponse);
  });

  it('exposes the pagination the UI needs', () => {
    let page: GifPage | undefined;
    api.searchGifs('dog', 25, 50).subscribe((value) => (page = value));

    httpTesting
      .expectOne(
        (candidate) => candidate.url === `${environment.apiUrl}/search`,
      )
      .flush(searchResponse);

    expect(page?.totalCount).toBe(500);
    expect(page?.offset).toBe(50);
    expect(page?.items).toEqual([]);
  });

  it('requests a single gif by id', () => {
    api.getGifById('abc').subscribe();

    const request = httpTesting.expectOne(`${environment.apiUrl}/abc`);

    expect(request.request.method).toBe('GET');

    request.flush({
      data: {
        id: 'abc',
        title: 'Dancing cat',
        url: 'https://giphy.com/gifs/abc',
        username: 'catlover',
        import_datetime: '2023-04-05 06:07:08',
        images: {
          fixed_width_downsampled: { url: 'preview.gif' },
          original: {
            url: 'original.gif',
            width: '480',
            height: '270',
            size: '1024',
          },
        },
      },
    });
  });
});
