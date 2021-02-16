import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInfoPageRoutingModule } from './log-info-routing.module';

import { LogInfoPage } from './log-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogInfoPageRoutingModule
  ],
  declarations: [LogInfoPage]
})
export class LogInfoPageModule {}
