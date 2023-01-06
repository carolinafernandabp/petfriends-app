import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPetloverPageRoutingModule } from './registro-petlover-routing.module';

import { RegistroPetloverPage } from './registro-petlover.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPetloverPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [RegistroPetloverPage]
})
export class RegistroPetloverPageModule {}
