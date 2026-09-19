import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { giphyApiKeyInterceptor } from './giphy-api-key';

describe('giphyApiKeyInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([giphyApiKeyInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('adds the key to Giphy requests', () => {
    httpClient.get(`${environment.apiUrl}/search`).subscribe();

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.apiUrl}/search`,
    );

    expect(request.request.params.get('api_key')).toBe(environment.apiKey);

    request.flush({});
  });

  it('leaves other hosts alone', () => {
    httpClient.get('https://example.com/data').subscribe();

    const request = httpTesting.expectOne('https://example.com/data');

    expect(request.request.params.get('api_key')).toBeNull();

    request.flush({});
  });
});
