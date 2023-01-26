import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        nacimiento: ['', [Validators.required, this.validateDate]],
        raza: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        tamanio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
        image: ['', Validators.required],
        especie: ['', Validators.required],
        estado: ['', Validators.required],
        microChip: ['', [ Validators.minLength(15), Validators.maxLength(20)]]
    });

 fechaMinima!: Date;


  constructor(private fb: FormBuilder,
              private fichaService : FichaMascotaService,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage,
              private toastController: ToastController) {

                this.fechaMinima = new Date(2013,0,1);


              }

              validateDate(control: FormGroup, fechaMinima:Date) {
                const selectedDate = new Date(control.value);
                const minDate = new Date(fechaMinima);
                const currentDate = new Date();
                if (selectedDate < minDate || selectedDate > currentDate) {
                  return { outOfRange: true };
                }
                return null;
              }


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
              this.router.navigateByUrl("/all-fichas");
              await toast.present();
              location.reload();


            }),
            catchError(async err => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-danger',
                message: 'No se pudo crear la ficha mascota',
                    duration: 1500,

              });

              await toast.present();
              this.router.navigateByUrl("/all-fichas");

            })
        )
        .subscribe();

  }


}
