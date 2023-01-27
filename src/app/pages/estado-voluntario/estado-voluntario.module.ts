import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoVoluntarioPageRoutingModule } from './estado-voluntario-routing.module';

import { EstadoVoluntarioPage } from './estado-voluntario.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoVoluntarioPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [EstadoVoluntarioPage]
})
export class EstadoVoluntarioPageModule {}
