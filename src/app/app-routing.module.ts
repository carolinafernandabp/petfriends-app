import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [

{
  path: '',
  loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
},
  {
    path: 'list-donar',
    loadChildren: () => import('./pages/list-donar/list-donar.module').then( m => m.ListDonarPageModule)
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
