import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSolicitudPage } from './list-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: ListSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSolicitudPageRoutingModule {}
