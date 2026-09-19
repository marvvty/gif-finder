import { Routes } from '@angular/router';
import { gifsRoutes } from './features/gifs/gifs.routes';

export const routes: Routes = [
  ...gifsRoutes,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
