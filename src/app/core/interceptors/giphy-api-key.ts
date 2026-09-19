import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const giphyApiKeyInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.apiUrl)) {
    return next(request);
  }

  return next(
    request.clone({
      params: request.params.set('api_key', environment.apiKey),
    }),
  );
};
