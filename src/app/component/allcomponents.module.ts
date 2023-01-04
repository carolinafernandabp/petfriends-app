import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { EditFichaComponent } from './edit-ficha/edit-ficha.component';
import { ListFichaComponent } from './list-ficha/list-ficha.component';
import { CreateSolicitudComponent } from './create-solicitud/create-solicitud.component';
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { CreateDonarComponent } from './create-donar/create-donar.component';
import { EditDonarComponent } from './edit-donar/edit-donar.component';
import { ListDonarComponent } from './list-donar/list-donar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    ListPublicacionComponent,
    CreateFichaComponent,
    EditFichaComponent,
    ListFichaComponent,
    CreateSolicitudComponent,
    EditSolicitudComponent,
    ListSolicitudComponent,
    CreateDonarComponent,
    EditDonarComponent,
    ListDonarComponent],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    ListPublicacionComponent,
    CreateFichaComponent,
    EditFichaComponent,
    ListFichaComponent,
    CreateSolicitudComponent,
    EditPublicacionComponent,
    ListSolicitudComponent,
    CreateDonarComponent,
    EditDonarComponent,
    ListDonarComponent]
})
export class AllcomponentsModule { }
