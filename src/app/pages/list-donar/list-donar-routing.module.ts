import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDonarPage } from './list-donar.page';

const routes: Routes = [
  {
    path: '',
    component: ListDonarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDonarPageRoutingModule {}
