import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVoluntarioPageRoutingModule } from './list-voluntario-routing.module';

import { ListVoluntarioPage } from './list-voluntario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVoluntarioPageRoutingModule
  ],
  declarations: [ListVoluntarioPage]
})
export class ListVoluntarioPageModule {}
