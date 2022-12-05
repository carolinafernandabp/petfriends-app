import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [HeaderComponent,FooterComponent],
  exports:[HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
