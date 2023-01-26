import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPublicacionesPageRoutingModule } from './all-publicaciones-routing.module';

import { AllPublicacionesPage } from './all-publicaciones.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPublicacionesPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [AllPublicacionesPage]
})
export class AllPublicacionesPageModule {}
