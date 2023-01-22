import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDonarPageRoutingModule } from './all-donar-routing.module';

import { AllDonarPage } from './all-donar.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDonarPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllDonarPage]
})
export class AllDonarPageModule {}
