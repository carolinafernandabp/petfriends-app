import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAdoptarPage } from './all-adoptar.page';

const routes: Routes = [
  {
    path: '',
    component: AllAdoptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllAdoptarPageRoutingModule {}
