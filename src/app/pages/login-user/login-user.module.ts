import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUserPageRoutingModule } from './login-user-routing.module';

import { LoginUserPage } from './login-user.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUserPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [LoginUserPage]
})
export class LoginUserPageModule {}
