import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { Donacion } from 'src/app/models/donar';
import { DonarService } from 'src/app/services/donar.service';

@Component({
  selector: 'app-create-donar',
  templateUrl: './create-donar.component.html',
  styleUrls: ['./create-donar.component.scss'],
})
export class CreateDonarComponent implements OnInit {

  donarId: any;
  iconUrl: any;

    form = this.fb.group({
        nombre:['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        rut: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        banco: ['', Validators.required],
        tipo: ['', Validators.required],
        cuenta: ['', Validators.required],
        correo: ['', Validators.required]
    });

  constructor(private fb: FormBuilder,
              private donarService : DonarService,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage,
              private toastController: ToastController) { }

  ngOnInit() {

    this.donarId = this.afs.createId();
  }

  async onCreateDonacion() {

    const val = this.form.value;

    const newDonacion: Partial<Donacion> = {

      nombre: val.nombre as string,
      rut: val.rut as string,
      banco: val.banco as string,
      tipo: val.tipo as string,
      cuenta: val.cuenta as string,
      correo: val.correo as string
  };

    this.donarService.createDonacion(newDonacion, this.donarId)
        .pipe(
            tap(async donacion => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-success',
                message: 'Publicación creada exitosamente',
                    duration: 1500,

              });
              this.router.navigateByUrl("/publicaciones");
              await toast.present();


            }),
            catchError(async err => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-danger',
                message: 'No se pudo crear la publicación',
                    duration: 1500,

              });

              await toast.present();
              this.router.navigateByUrl("/home");

            })
        )
        .subscribe();

  }
}
