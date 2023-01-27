import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllVoluntarioPage } from './all-voluntario.page';

const routes: Routes = [
  {
    path: '',
    component: AllVoluntarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllVoluntarioPageRoutingModule {}
