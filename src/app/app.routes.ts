import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      },
];
