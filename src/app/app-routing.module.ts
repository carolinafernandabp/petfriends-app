import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdoptarComponent } from './component/adoptar/adoptar.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

{
  path: '',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),

},

{
  path: 'ficha',
  loadChildren: () => import('./pages/ficha/ficha.module').then( m => m.FichaPageModule),

},

{
  path: 'solicitud',
  loadChildren: () => import('./pages/solicitud/solicitud.module').then( m => m.SolicitudPageModule),
},
{
  path: 'donar',
  loadChildren: () => import('./pages/donar/donar.module').then( m => m.DonarPageModule),


},

{
  path: 'registro-usuario',
  loadChildren: () => import('./pages/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
},
{
  path: 'login-user',
  loadChildren: () => import('./pages/login-user/login-user.module').then( m => m.LoginUserPageModule)
},

  {
    path: 'all-organizacion',
    loadChildren: () => import('./pages/all-organizacion/all-organizacion.module').then( m => m.AllOrganizacionPageModule)
  },
  {
    path: 'all-fichas',
    loadChildren: () => import('./pages/all-fichas/all-fichas.module').then( m => m.AllFichasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-donar',
    loadChildren: () => import('./pages/all-donar/all-donar.module').then( m => m.AllDonarPageModule)
  },
  {
    path: 'crear-publicacion',
    loadChildren: () => import('./pages/crear-publicacion/crear-publicacion.module').then( m => m.CrearPublicacionPageModule)
  },
  {
    path: 'all-publicaciones',
    loadChildren: () => import('./pages/all-publicaciones/all-publicaciones.module').then( m => m.AllPublicacionesPageModule)
  },
  {
    path: 'list-adoptar',
    loadChildren: () => import('./pages/list-adoptar/list-adoptar.module').then( m => m.ListAdoptarPageModule)
  },
  {
    path: 'list-voluntario',
    loadChildren: () => import('./pages/list-voluntario/list-voluntario.module').then( m => m.ListVoluntarioPageModule)
  },
  {
    path: 'form-adoptar',
    loadChildren: () => import('./pages/form-adoptar/form-adoptar.module').then( m => m.FormAdoptarPageModule)
  },
  {
    path: 'all-adoptar',
    loadChildren: () => import('./pages/all-adoptar/all-adoptar.module').then( m => m.AllAdoptarPageModule)
  },
  {
    path: 'estado-adopcion',
    loadChildren: () => import('./pages/estado-adopcion/estado-adopcion.module').then( m => m.EstadoAdopcionPageModule)
  },

  {
    path: 'all-voluntario',
    loadChildren: () => import('./pages/all-voluntario/all-voluntario.module').then( m => m.AllVoluntarioPageModule)
  },
  {
    path: 'estado-voluntario',
    loadChildren: () => import('./pages/estado-voluntario/estado-voluntario.module').then( m => m.EstadoVoluntarioPageModule)
  },






];

@NgModule({

  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


