import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAdoptarPage } from './list-adoptar.page';

const routes: Routes = [
  {
    path: '',
    component: ListAdoptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdoptarPageRoutingModule {}
