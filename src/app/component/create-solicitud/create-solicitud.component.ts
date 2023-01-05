import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, concatMap, last, tap, throwError } from 'rxjs';
import { Solicitud} from '../../models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-create-solicitud',
  templateUrl: './create-solicitud.component.html',
  styleUrls: ['./create-solicitud.component.scss'],
})
export class CreateSolicitudComponent implements OnInit {

  solicitudId: any;
  iconUrl: any;

    form = this.fb.group({

        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        disponibilidad:['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        telefono: ['', Validators.required],
        category: ['', Validators.required],
    });

  constructor(private fb: FormBuilder,
              private solicitudService : SolicitudService,
              private afs: AngularFirestore,
              private router: Router,
              private storage: AngularFireStorage,
              private toastController: ToastController) { }

              uploadThumbnail(event:any) {

                const file: File = event.target.files[0];

                console.log(file.name);

                const filePath = `solicitudes/${this.solicitudId}/${file.name}`;

                const task = this.storage.upload(filePath, file, {
                    cacheControl: "max-age=2592000,public"
                });


                task.snapshotChanges()
                    .pipe(
                        last(),
                        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                        tap((url) => this.iconUrl = url),
                        catchError(err => {
                            console.log(err);
                            alert("Could not create thumbnail url.");
                            return throwError(err);
                        })

                    )
                    .subscribe();

            }


  ngOnInit() {

    this.solicitudId = this.afs.createId();
  }

  async onCreateSolicitud() {

    const val = this.form.value;

    const newSolicitud: Partial<Solicitud> = {

      description: val.description as string,
      disponibilidad: val.disponibilidad as string,
      telefono: val.telefono as string,
      category: [val.category as string]

  };

    this.solicitudService.createSolicitud(newSolicitud, this.solicitudId)
        .pipe(
            tap(async solicitud => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-success',
                message: 'Solcitud enviada exitosamente',
                    duration: 1500,

              });
              this.router.navigateByUrl("/solicitudes");
              await toast.present();


            }),
            catchError(async err => {
              const toast = await  this.toastController.create({
                cssClass: 'toast-danger',
                message: 'No se pudo enviar la solicitud',
                    duration: 1500,

              });

              await toast.present();
              this.router.navigateByUrl("/home");

            })
        )
        .subscribe();

  }


}
