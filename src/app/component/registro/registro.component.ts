import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {


  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
     admin: [false]
});



  constructor(
                private fb: FormBuilder,
                private http: HttpClient,
                public router : Router) { }

  ngOnInit() {}

  onCreateUser() {

    const user = this.form.value;

    console.log(user);

    this.http.post(environment.api.createUser  , {
        email: user.email,
        password: user.password,
        admin: user.admin
    })
        .pipe(
            catchError((err: any) => {
                console.log(err);
                alert('Could not create user');
                return throwError(err);
            })
        )
        .subscribe(() => {
            alert("User created successfully!");
            this.router.navigate(['login-user']);
        });
}

singup(){
  this.router.navigate(['login-user']);
}

}
