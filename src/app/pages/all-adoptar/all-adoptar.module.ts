import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAdoptarPageRoutingModule } from './all-adoptar-routing.module';

import { AllAdoptarPage } from './all-adoptar.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllAdoptarPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllAdoptarPage]
})
export class AllAdoptarPageModule {}
