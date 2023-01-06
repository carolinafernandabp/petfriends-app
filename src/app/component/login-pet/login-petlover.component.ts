import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PetloverService } from 'src/app/services/petlover.service';

@Component({
  selector: 'app-login-pet',
  templateUrl: './login-petlover.component.html',
  styleUrls: ['./login-petlover.component.scss'],
})
export class LoginPetComponent implements OnInit {

  constructor(public afAuth : AngularFireAuth,
              private router : Router,
              private authService : PetloverService) { }

              public email: string = '';
              public password: string = '';

  ngOnInit() {}

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['home-petlover']);
  }


}
