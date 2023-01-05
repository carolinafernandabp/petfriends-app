import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDonarPageRoutingModule } from './list-donar-routing.module';

import { ListDonarPage } from './list-donar.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDonarPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [ListDonarPage]
})
export class ListDonarPageModule {}
