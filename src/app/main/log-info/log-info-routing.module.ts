import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInfoPage } from './log-info.page';

const routes: Routes = [
  {
    path: '',
    component: LogInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogInfoPageRoutingModule {}
