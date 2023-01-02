import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.scss'],
})
export class CrearUserComponent implements OnInit {

    form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    admin: [false]
});

  constructor( private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {}

  onCreateUser() {

    const user = this.form.value;

    console.log(user);

    this.http.post(environment.api.createUser, {
        email: user.email,
        password: user.password,
        admin: user.admin
    })
        .pipe(
            catchError(err => {
                console.log(err);
                alert('Could not create user');
                return throwError(err);
            })
        )
        .subscribe(() => {
            alert("User created successfully!");
            this.form.reset();
        });



}

}
