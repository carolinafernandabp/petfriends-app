import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [

{
  path: '',
  loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
},
  {
    path: 'home-petlover',
    loadChildren: () => import('./pages/home-petlover/home-petlover.module').then( m => m.HomePetloverPageModule)
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
