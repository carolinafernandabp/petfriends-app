import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePetloverPageRoutingModule } from './home-petlover-routing.module';

import { HomePetloverPage } from './home-petlover.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePetloverPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [HomePetloverPage]
})
export class HomePetloverPageModule {}
