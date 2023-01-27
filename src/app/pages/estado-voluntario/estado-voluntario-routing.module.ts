import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoVoluntarioPage } from './estado-voluntario.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoVoluntarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoVoluntarioPageRoutingModule {}
