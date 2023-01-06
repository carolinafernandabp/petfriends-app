import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoUsuarioPageRoutingModule } from './tipo-usuario-routing.module';

import { TipoUsuarioPage } from './tipo-usuario.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoUsuarioPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [TipoUsuarioPage]
})
export class TipoUsuarioPageModule {}
