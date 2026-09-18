import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GiphySearchResponse, GiphyByIdResponse } from './giphy-dto';

@Injectable({
  providedIn: 'root',
})
export class GiphyApi {
  private readonly httpClient = inject(HttpClient);

  searchGifs(
    query: string,
    limit: number = 25,
    offset: number = 0,
  ): Observable<GiphySearchResponse> {
    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('q', query)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.httpClient.get<GiphySearchResponse>(
      `${environment.apiUrl}/search`,
      { params },
    );
  }

  getGifById(id: string): Observable<GiphyByIdResponse> {
    const params = new HttpParams().set('api_key', environment.apiKey);
    return this.httpClient.get<GiphyByIdResponse>(
      `${environment.apiUrl}/${id}`,
      {
        params,
      },
    );
  }
}
