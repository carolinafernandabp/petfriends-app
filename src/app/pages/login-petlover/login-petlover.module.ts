import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPetloverPageRoutingModule } from './login-petlover-routing.module';

import { LoginPetloverPage } from './login-petlover.page';
import { AllcomponentsModule } from 'src/app/component/allcomponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPetloverPageRoutingModule,
    AllcomponentsModule
  ],
  declarations: [LoginPetloverPage]
})
export class LoginPetloverPageModule {}
