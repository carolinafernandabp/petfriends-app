import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAdoptarPageRoutingModule } from './list-adoptar-routing.module';

import { ListAdoptarPage } from './list-adoptar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAdoptarPageRoutingModule
  ],
  declarations: [ListAdoptarPage]
})
export class ListAdoptarPageModule {}
