import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllOrganizacionPageRoutingModule } from './all-organizacion-routing.module';

import { AllOrganizacionPage } from './all-organizacion.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllOrganizacionPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllOrganizacionPage]
})
export class AllOrganizacionPageModule {}
