import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GiphySearchResponse, GiphyByIdResponse } from '../models/giphy-dto';
import { Gif, GifPage, toGif } from '../models/giphy-mapper';
import { SAFE_RATING } from '../models/giphy.constant';

@Injectable({
  providedIn: 'root',
})
export class GiphyApi {
  private readonly httpClient = inject(HttpClient);

  searchGifs(
    query: string,
    limit: number,
    offset: number,
  ): Observable<GifPage> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit)
      .set('offset', offset)
      .set('rating', SAFE_RATING);

    return this.httpClient
      .get<GiphySearchResponse>(`${environment.apiUrl}/search`, { params })
      .pipe(
        map((response) => ({
          items: response.data.map(toGif),
          totalCount: response.pagination.total_count,
          offset: response.pagination.offset,
        })),
      );
  }

  getGifById(id: string): Observable<Gif> {
    return this.httpClient
      .get<GiphyByIdResponse>(`${environment.apiUrl}/${id}`)
      .pipe(map((response) => toGif(response.data)));
  }
}
