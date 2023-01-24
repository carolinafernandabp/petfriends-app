import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isLogged: boolean = false;

  @Input()title!: string;

  constructor( private router: Router,
                public user : UserService,
                private toastController : ToastController) { }

  async ngOnInit() {

  }

  async logout(){

    this.user.logout()
    this.router.navigate(['']);
    const toast = await this.toastController.create({
      message: 'Sesión Cerrada ',
      duration: 1500,
      cssClass: 'toast-danger',
      icon: 'exit-outline'
    });

    await toast.present();
  }


}
