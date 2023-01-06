import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPetloverPage } from './registro-petlover.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPetloverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPetloverPageRoutingModule {}
