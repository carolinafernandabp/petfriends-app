import { Component } from '@angular/core';
import { AuthTokenService } from './services/auth-token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(public user: UserService,
                private token: AuthTokenService ) {}

    logout() {
      this.user.logout();
  }
}
