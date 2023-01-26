import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs';
import { SolicitudService } from 'src/app/services/Solicitudservice';
import {Solicitud} from'../../models/solicitud';
@Component({
  selector: 'app-enviarsolicitud',
  templateUrl: './enviarsolicitud.component.html',
  styleUrls: ['./enviarsolicitud.component.scss'],
})
export class EnviarsolicitudComponent implements OnInit {

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],

});

  constructor(private solicitudService: SolicitudService,
                private fb : FormBuilder,
                private afs: AngularFirestore,
                private router: Router,
                private toastController: ToastController) { }

  ngOnInit() {}

  enviarSolicitud(){

  }


}
