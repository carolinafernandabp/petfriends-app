import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthTokenService } from './services/auth-token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(public user: UserService,
                private token: AuthTokenService,
                  public router : Router,
                  private toastController : ToastController,
                  private menu: MenuController ) {}


    async logout() {
      this.user.logout();
      this.router.navigate(['']);
      const toast = await this.toastController.create({
        message: 'Sesión Cerrada correctamente',
        duration: 1500,
        cssClass: 'toast-danger',
        icon: 'exit-outline'
      });

      await toast.present();
  }
}
