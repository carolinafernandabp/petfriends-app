import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, concatMap, last, Observable, tap, throwError } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-create-publicacion',
  templateUrl: './create-publicacion.component.html',
  styleUrls: ['./create-publicacion.component.scss'],
})
export class CreatePublicacionComponent implements OnInit {

  publicacionId!: string;

  percentageChanges$!: Observable<number> | any ;

  iconUrl!: string;

    form = this.fb.group({
        titulo:['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        category: ['', Validators.required],
        url: [''],
    });


  constructor(private fb: FormBuilder,
              private publicacionService: PublicacionService,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage,
              private toastController: ToastController) { }

              uploadThumbnail(event:any) {

                const file: File = event.target.files[0];

                console.log(file.name);

                const filePath = `publicaciones/${this.publicacionId}/${file.name}`;

                const task = this.storage.upload(filePath, file, {
                    cacheControl: "max-age=2592000,public"
                });

                this.percentageChanges$ = task.percentageChanges();


                task.snapshotChanges()
                    .pipe(
                        last(),
                        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                        tap(url => this.iconUrl = url),
                        catchError(err => {
                            console.log(err);
                            return throwError(err);
                        })

                    )
                    .subscribe();

            }

  ngOnInit() {

  this.publicacionId = this.afs.createId();
  }

  async onCreatePublicacion() {

    const val = this.form.value;

    const newPublicacion: Partial<Publicacion> = {

      titulo: val.titulo as string  | any,
      description: val.description as string | any,
      category: [val.category as string] ,
      url: val.url as any,

  };

    this.publicacionService.createPublicacion(newPublicacion, this.publicacionId)
        .pipe(
            tap(async publicacion => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-success',
                message: 'Publicación creada exitosamente',
                    duration: 1500,

              });

              this.router.navigate(['/']);
              await toast.present();
              location.reload();


            }),

            catchError(async err => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-danger',
                message: 'No se pudo crear la publicación',
                    duration: 1500,

              });

              await toast.present();
              this.router.navigate(['/']);


            })
        )
        .subscribe();


  }

}
