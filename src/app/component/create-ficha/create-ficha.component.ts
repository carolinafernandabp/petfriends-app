import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, concatMap, last, tap, throwError } from 'rxjs';
import { Ficha } from 'src/app/models/ficha-mascota';
import { FichaMascotaService } from 'src/app/services/ficha.service';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-create-ficha',
  templateUrl: './create-ficha.component.html',
  styleUrls: ['./create-ficha.component.scss'],
})
export class CreateFichaComponent implements OnInit {

  fichaId: any;
  iconUrl: any;

    form = this.fb.group({
        nombre:['', [Validators.required]],
        nacimiento: ['', [Validators.required]],
        raza: ['', Validators.required],
        color: ['', Validators.required],
        tamanio: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required],
        especie: ['', Validators.required],
        estado: ['', Validators.required],
        microChip: ['', Validators.required]
    });


  constructor(private fb: FormBuilder,
              private fichaService : FichaMascotaService,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage,
              private toastController: ToastController) { }


    uploadThumbnail(event:any) {

      const file: File = event.target.files[0];

      console.log(file.name);

      const filePath = `fichas/${this.fichaId}/${file.name}`;

      const task = this.storage.upload(filePath, file, {
          cacheControl: "max-age=2592000,public"
      });


      task.snapshotChanges()
          .pipe(
              last(),
              concatMap(() => this.storage.ref(filePath).getDownloadURL()),
              tap(url => this.iconUrl = url),
              catchError(err => {
                  console.log(err);
                  alert("Could not create thumbnail url.");
                  return throwError(err);
              })

          )
          .subscribe();

      }
  ngOnInit() {

    this.fichaId = this.afs.createId();
  }

  async onCreateFicha() {

    const val = this.form.value;

    const newFicha: Partial<Ficha> = {

      nombre: val.nombre as string,
      nacimiento: val.nacimiento as unknown  as Date,
      raza: val.raza as string,
      color: val.color as String,
      tamanio: val.tamanio as string,
      description: val.description as string,
      image: val.image as string,
      especie: [val.especie as string],
      estado: [val.estado as string],
      microChip: val.microChip as string,
  };

    this.fichaService.createFicha(newFicha, this.fichaId)
        .pipe(
            tap(async ficha => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-success',
                message: 'Ficha creada exitosamente',
                    duration: 1500,

              });
              this.router.navigateByUrl("/fichas");
              await toast.present();


            }),
            catchError(async err => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-danger',
                message: 'No se pudo crear la ficha mascota',
                    duration: 1500,

              });

              await toast.present();
              this.router.navigateByUrl("/fichas");

            })
        )
        .subscribe();

  }
}
