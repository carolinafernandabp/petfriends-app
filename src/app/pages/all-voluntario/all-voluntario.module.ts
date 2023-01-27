import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllVoluntarioPageRoutingModule } from './all-voluntario-routing.module';

import { AllVoluntarioPage } from './all-voluntario.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllVoluntarioPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllVoluntarioPage]
})
export class AllVoluntarioPageModule {}
