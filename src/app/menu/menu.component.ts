import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuItems = [
    {
      title: 'Adoptar',
      icon: 'paw',
      path: '/'
    },
    {
      title: 'Solicitud',
      icon: 'book',
      path: '/'
    },
    {
      title: 'Donar',
      icon: 'cash',
      path: '/'
    },


  ];

  title = 'Inicio';


  constructor(private menuCtrl: MenuController, private plt: Platform) { }

  ngOnInit() {

    const width = this.plt.width();
    this.toggleMenu(width);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
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


}
