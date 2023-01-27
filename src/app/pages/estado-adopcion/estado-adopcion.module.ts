import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoAdopcionPageRoutingModule } from './estado-adopcion-routing.module';

import { EstadoAdopcionPage } from './estado-adopcion.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoAdopcionPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [EstadoAdopcionPage]
})
export class EstadoAdopcionPageModule {}
