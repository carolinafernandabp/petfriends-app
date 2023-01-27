import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListVoluntarioPage } from './list-voluntario.page';

const routes: Routes = [
  {
    path: '',
    component: ListVoluntarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListVoluntarioPageRoutingModule {}
