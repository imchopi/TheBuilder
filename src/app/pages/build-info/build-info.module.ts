import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildInfoPageRoutingModule } from './build-info-routing.module';

import { BuildInfoPage } from './build-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildInfoPageRoutingModule
  ],
  declarations: [BuildInfoPage]
})
export class BuildInfoPageModule {}
