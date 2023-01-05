import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSolicitudPageRoutingModule } from './list-solicitud-routing.module';


import { AllcomponentsModule } from 'src/app/component/allcomponents.module';
import { ListSolicitudPage } from './list-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSolicitudPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [ListSolicitudPage]
})
export class ListSolicitudPageModule {}
