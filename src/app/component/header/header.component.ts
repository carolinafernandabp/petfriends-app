import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isLogged: boolean = false;


  @Input()title!: string;

  dropdown = false;

  @ViewChild('productbtn', { read: ElementRef })
  productbtn!: ElementRef;


  constructor(private userService : UserService,
              private router: Router) { }

  async ngOnInit() {

    this.getCurrentUser();
  }

  logout(){

    this.userService.logoutUser();
    this.router.navigate(['login-usuario']);
    console.log('sesión cerrada');
  }

  getCurrentUser() {
    this.userService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }


  hideDropdown(event: { clientX: any; clientY: any; }) {

    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }


}
