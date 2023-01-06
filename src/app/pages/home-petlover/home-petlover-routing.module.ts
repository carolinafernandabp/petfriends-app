import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePetloverPage } from './home-petlover.page';

const routes: Routes = [
  {
    path: '',
    component: HomePetloverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePetloverPageRoutingModule {}
