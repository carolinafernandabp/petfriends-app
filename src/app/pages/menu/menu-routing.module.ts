import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [

      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'solicitud',
        loadChildren: () => import('../solicitud/solicitud.module').then(m => m.SolicitudPageModule)
      },
      {
        path: 'donar',
        loadChildren: () => import('../donar/donar.module').then(m => m.DonarPageModule)
      },
      {
        path: 'publicacion',
        loadChildren: () => import('../publicacion/publicacion.module').then( m => m.PublicacionPageModule)
      },
      {
        path: 'ficha',
        loadChildren: () => import('../ficha/ficha.module').then( m => m.FichaPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
