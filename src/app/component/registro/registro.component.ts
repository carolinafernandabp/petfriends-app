import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/models';
import { UserInterface } from 'src/app/models/user-roles';
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
                public router : Router,
                private toastController : ToastController) { }

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
                this.presentToastDanger('No se pudo crear el usuario');
               // alert('Could not create user');
                return throwError(err);
            })
        )
        .subscribe(() => {
          this.presentToastSuccess('Usuario creado exitosamente');
           // alert("User created successfully!");
            this.router.navigate(['login-user']);
        });
}

singup(){
  this.router.navigate(['login-user']);
}

async presentToastSuccess(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    cssClass: 'normal',
    duration: 2000,
    color: "success",
  });
  toast.present();
}

async presentToastWarning(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    cssClass: 'normal',
    duration: 2000,
    color: "warning",
  });
  toast.present();
}

async presentToastDanger(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    cssClass: 'normal',
    duration: 2000,
    color: 'danger',
  });
  toast.present();
}

}
