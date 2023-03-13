import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthTokenService } from './services/auth-token.service';
import { NotificationsService } from './services/notifications.service';
import { UserService } from './services/user.service';
import { Platform } from '@ionic/angular';
import { PushNotificationService } from './services/push-notification.service';


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
                  private menu: MenuController,
                  private notificationsService : NotificationsService,
                  private platform: Platform,
                  private pushNotificationService: PushNotificationService
                 ) {

                  this.initializeApp();

                   }
                   initializeApp() {
                    this.platform.ready().then(() => {
                      this.pushNotificationService.requestPermission();
                      this.pushNotificationService.receiveMessage();
                    });
                  }

                  ngOnInit() {
                    this.pushNotificationService.currentMessage.subscribe((message) => {
                      console.log('Push notification received', message);
                    });
                  }

  closeMenu() {
    this.menu.close(); // Cierra el menú lateral
    document.getElementsByTagName('ion-app')[0].classList.remove('menu-content-open'); // Remueve la clase "menu-content-open" de <ion-app>
  }

    async logout() {
      this.user.logout();
      this.router.navigate(['']);
      const toast = await this.toastController.create({
        message: 'Sesión Cerrada correctamente',
        duration: 1500,
        cssClass: 'toast-success',
        icon: 'exit-outline'
      });

      await toast.present();
  }



}
