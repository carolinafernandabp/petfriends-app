import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDonarPage } from './all-donar.page';

const routes: Routes = [
  {
    path: '',
    component: AllDonarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDonarPageRoutingModule {}
