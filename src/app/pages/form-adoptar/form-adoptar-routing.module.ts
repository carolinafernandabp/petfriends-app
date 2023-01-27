import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAdoptarPage } from './form-adoptar.page';

const routes: Routes = [
  {
    path: '',
    component: FormAdoptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAdoptarPageRoutingModule {}
