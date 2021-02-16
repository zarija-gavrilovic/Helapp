import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'review',
        loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
      },
      {
        path: 'lists',
        loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'log-info',
        loadChildren: () => import('./log-info/log-info.module').then( m => m.LogInfoPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
