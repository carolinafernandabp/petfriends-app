import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPetloverPage } from './login-petlover.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPetloverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPetloverPageRoutingModule {}
