import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CrearUserComponent } from './crear-user/crear-user.component';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { EditFichaComponent } from './edit-ficha/edit-ficha.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { HomeComponent } from './home/home.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [

  {
    path: '',
    component: HomeComponent,

},

{
  path: 'create-publicacion',
  component: CreatePublicacionComponent,

},

{
  path: 'login',
  component: LoginComponent,

},
{
  path: 'crear-user',
  component: CrearUserComponent,

},
{
  path: 'edit-publicacion',
  component: CrearUserComponent,

},
{
  path: 'create-ficha',
  component: CreateFichaComponent,

},
{
  path: 'edit-ficha',
  component: EditFichaComponent,

},

  {
    path: '**',
    redirectTo: '/'
},


];

@NgModule({


  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
