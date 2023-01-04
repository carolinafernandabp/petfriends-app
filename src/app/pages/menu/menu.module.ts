import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { SolicitudPageRoutingModule } from '../solicitud/solicitud-routing.module';
import { DonarPageRoutingModule } from '../donar/donar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
