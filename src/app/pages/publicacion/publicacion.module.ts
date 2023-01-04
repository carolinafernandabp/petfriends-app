import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionPageRoutingModule } from './publicacion-routing.module';

import { PublicacionPage } from './publicacion.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';
import { CreateFichaComponent } from 'src/app/component/create-ficha/create-ficha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [PublicacionPage]
})
export class PublicacionPageModule {}
