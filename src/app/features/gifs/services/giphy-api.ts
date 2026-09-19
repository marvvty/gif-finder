import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GiphySearchResponse, GiphyByIdResponse } from '../models/giphy-dto';
import { Gif, toGif } from '../models/giphy-mapper';

@Injectable({
  providedIn: 'root',
})
export class GiphyApi {
  private readonly httpClient = inject(HttpClient);

  searchGifs(
    query: string,
    limit: number = 25,
    offset: number = 0,
  ): Observable<Gif[]> {
    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('q', query)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.httpClient
      .get<GiphySearchResponse>(`${environment.apiUrl}/search`, { params })
      .pipe(map((response) => response.data.map(toGif)));
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
