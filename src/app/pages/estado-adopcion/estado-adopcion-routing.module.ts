import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoAdopcionPage } from './estado-adopcion.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoAdopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoAdopcionPageRoutingModule {}
