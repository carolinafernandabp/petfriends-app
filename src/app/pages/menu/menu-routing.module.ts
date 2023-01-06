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
      {
        path: 'edit-ficha',
        loadChildren: () => import('../edit-ficha/edit-ficha.module').then( m => m.EditFichaPageModule)
      },
      {
        path: 'solicitud',
        loadChildren: () => import('../solicitud/solicitud.module').then( m => m.SolicitudPageModule)
      },
      {
        path: 'list-solicitud',
        loadChildren: () => import('../list-solicitud/list-solicitud.module').then( m => m.ListSolicitudPageModule)
      },
      {
        path: 'list-donar',
        loadChildren: () => import('../list-donar/list-donar.module').then( m => m.ListDonarPageModule)
      },
      {
        path: 'registro-usuario',
        loadChildren: () => import('../registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
      },
      {
        path: 'registro-petlover',
        loadChildren: () => import('../registro-petlover/registro-petlover.module').then( m => m.RegistroPetloverPageModule)
      },

      {
        path: 'tipo-usuario',
        loadChildren: () => import('../tipo-usuario/tipo-usuario.module').then( m => m.TipoUsuarioPageModule)
      },
      {
        path: 'login-usuario',
        loadChildren: () => import('../login-usuario/login-usuario.module').then( m => m.LoginUsuarioPageModule)
      },
      {
        path: 'home-organizacion',
        loadChildren: () => import('../home-organizacion/home-organizacion.module').then( m => m.HomeOrganizacionPageModule)
      },











    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
