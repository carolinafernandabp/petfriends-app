import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { CreateDonarComponent } from './create-donar/create-donar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';
import { ListOrganizacionComponent } from './list-organizacion/list-organizacion.component';
import { ListFichaMascotaComponent } from './list-ficha-mascota/list-ficha-mascota.component';
import { VerPublicacionComponent } from './ver-publicacion/ver-publicacion.component';
import { EditFichaComponent } from './edit-ficha/edit-ficha.component';
import { VerFichaComponent } from './ver-ficha/ver-ficha.component';
import { ListDonarComponent } from './list-donar/list-donar.component';
import { RecibirSolicitudComponent } from './recibir-solicitud/recibir-solicitud.component';
import { EnviarsolicitudComponent } from './enviarsolicitud/enviarsolicitud.component';

@NgModule({


  declarations: [
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    CreateFichaComponent,
    EditSolicitudComponent,
    CreateDonarComponent,
    LoginComponent,
    RegistroComponent,
    ListPublicacionComponent,
    ListOrganizacionComponent,
    ListFichaMascotaComponent,
    VerPublicacionComponent,
    EditFichaComponent,
    VerFichaComponent,
    ListDonarComponent,
    RecibirSolicitudComponent,
    EnviarsolicitudComponent
],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    CreatePublicacionComponent,
    EditPublicacionComponent,
    CreateFichaComponent,
    EditPublicacionComponent,
    CreateDonarComponent,
    LoginComponent,
    RegistroComponent,
    ListPublicacionComponent,
    ListOrganizacionComponent,
    ListFichaMascotaComponent,
    VerPublicacionComponent,
    EditFichaComponent,
    VerFichaComponent,
    ListDonarComponent,
    RecibirSolicitudComponent,
    EnviarsolicitudComponent


]
})
export class AllcomponentsModule { }
