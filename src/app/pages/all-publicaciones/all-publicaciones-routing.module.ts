import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPublicacionesPage } from './all-publicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AllPublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPublicacionesPageRoutingModule {}
