import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      title: 'Solicitud',
      icon: 'document',
      path: '/solicitud'
    },
    {
      title: 'Donar',
      icon: 'cash',
      path: '/donar'
    },

  ];

  title = 'Home';


  constructor(private menuCtrl: MenuController, private plt: Platform) { }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  toggleMenu(width: number) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }

  setTitle(title: any) {
    this.title = title
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any){
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

}
