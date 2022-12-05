import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgAmigasPageRoutingModule } from './org-amigas-routing.module';

import { OrgAmigasPage } from './org-amigas.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgAmigasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [OrgAmigasPage]
})
export class OrgAmigasPageModule {}
