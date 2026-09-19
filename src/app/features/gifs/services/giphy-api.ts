import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GiphySearchResponse, GiphyByIdResponse } from '../models/giphy-dto';
import { Gif, toGif } from '../models/giphy-mapper';
import { PAGE_SIZE } from '../models/giphy.constant';

export interface GiphyPage {
  items: Gif[];
  totalCount: number;
  offset: number;
}

@Injectable({
  providedIn: 'root',
})
export class GiphyApi {
  private readonly httpClient = inject(HttpClient);

  searchGifs(
    query: string,
    limit: number = PAGE_SIZE,
    offset: number = 0,
  ): Observable<GiphyPage> {
    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('q', query)
      .set('limit', limit)
      .set('offset', offset);

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
    const params = new HttpParams().set('api_key', environment.apiKey);
    return this.httpClient
      .get<GiphyByIdResponse>(`${environment.apiUrl}/${id}`, {
        params,
      })
      .pipe(map((response) => toGif(response.data)));
  }
}
