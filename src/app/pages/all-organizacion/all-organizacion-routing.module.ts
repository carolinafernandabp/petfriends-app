import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOrganizacionPage } from './all-organizacion.page';

const routes: Routes = [
  {
    path: '',
    component: AllOrganizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOrganizacionPageRoutingModule {}
