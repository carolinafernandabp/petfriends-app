import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFichaPage } from './edit-ficha.page';

const routes: Routes = [
  {
    path: '',
    component: EditFichaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFichaPageRoutingModule {}
