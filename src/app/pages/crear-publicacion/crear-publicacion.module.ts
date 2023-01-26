import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPublicacionPageRoutingModule } from './crear-publicacion-routing.module';

import { CrearPublicacionPage } from './crear-publicacion.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPublicacionPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [CrearPublicacionPage]
})
export class CrearPublicacionPageModule {}
