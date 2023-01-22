import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllFichasPage } from './all-fichas.page';

const routes: Routes = [
  {
    path: '',
    component: AllFichasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllFichasPageRoutingModule {}
