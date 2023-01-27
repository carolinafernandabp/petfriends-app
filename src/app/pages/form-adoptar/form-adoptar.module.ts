import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAdoptarPageRoutingModule } from './form-adoptar-routing.module';

import { FormAdoptarPage } from './form-adoptar.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAdoptarPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [FormAdoptarPage]
})
export class FormAdoptarPageModule {}
