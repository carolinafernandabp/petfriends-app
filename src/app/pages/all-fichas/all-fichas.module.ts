import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllFichasPageRoutingModule } from './all-fichas-routing.module';

import { AllFichasPage } from './all-fichas.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllFichasPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllFichasPage]
})
export class AllFichasPageModule {}
