import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

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
        path: 'login-petlover',
        loadChildren: () => import('../login-petlover/login-petlover.module').then( m => m.LoginPetloverPageModule)
      },
      {
        path: 'home-organizacion',
        loadChildren: () => import('../home-organizacion/home-organizacion.module').then( m => m.HomeOrganizacionPageModule)
      },
      {
        path: 'home-petlover',
        loadChildren: () => import('../home-petlover/home-petlover.module').then( m => m.HomePetloverPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        canActivate: [AuthGuard]
      },














    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
