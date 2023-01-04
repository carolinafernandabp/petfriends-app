import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonarPageRoutingModule } from './donar-routing.module';

import { DonarPage } from './donar.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonarPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [DonarPage]
})
export class DonarPageModule {}
