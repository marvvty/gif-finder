import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const gifsRoutes: Routes = [
  {
    path: '',
    component: Home,
  },
  // {
  //   path: 'gif/:id',
  //   loadComponent: () =>
  //     import('./pages/gif-details/gif-details').then((m) => m.GifDetails),
  // },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
