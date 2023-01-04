import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFichaPageRoutingModule } from './edit-ficha-routing.module';

import { EditFichaPage } from './edit-ficha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFichaPageRoutingModule
  ],
  declarations: [EditFichaPage]
})
export class EditFichaPageModule {}
