import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { ComponentsModule } from '../components/components.module';
import { OrgAmigasPageRoutingModule } from '../org-amigas/org-amigas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    HomePageRoutingModule,
    OrgAmigasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
