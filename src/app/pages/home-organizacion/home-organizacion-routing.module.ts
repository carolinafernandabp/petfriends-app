import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeOrganizacionPage } from './home-organizacion.page';

const routes: Routes = [
  {
    path: '',
    component: HomeOrganizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeOrganizacionPageRoutingModule {}
