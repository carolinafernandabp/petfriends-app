import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CreatePublicacionComponent } from './create-publicacion/create-publicacion.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFichaComponent } from './create-ficha/create-ficha.component';
import { EditPublicacionComponent } from './edit-publicacion/edit-publicacion.component';
import { ListPublicacionComponent } from './list-publicacion/list-publicacion.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CreatePublicacionComponent,
    CreateFichaComponent,
    EditPublicacionComponent,
    ListPublicacionComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[HeaderComponent,CreatePublicacionComponent,CreateFichaComponent]
})
export class AllcomponentsModule { }
