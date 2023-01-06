import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeOrganizacionPageRoutingModule } from './home-organizacion-routing.module';

import { HomeOrganizacionPage } from './home-organizacion.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeOrganizacionPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [HomeOrganizacionPage]
})
export class HomeOrganizacionPageModule {}
