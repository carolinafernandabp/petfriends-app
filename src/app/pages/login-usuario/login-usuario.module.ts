import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioPageRoutingModule } from './login-usuario-routing.module';

import { LoginUsuarioPage } from './login-usuario.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [LoginUsuarioPage]
})
export class LoginUsuarioPageModule {}
