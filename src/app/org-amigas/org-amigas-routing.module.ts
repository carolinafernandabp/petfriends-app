import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgAmigasPage } from './org-amigas.page';

const routes: Routes = [
  {
    path: '',
    component: OrgAmigasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgAmigasPageRoutingModule {}
