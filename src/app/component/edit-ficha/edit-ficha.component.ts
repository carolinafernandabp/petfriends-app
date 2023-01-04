import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ficha } from 'src/app/models/ficha-mascota';
import { FichaMascotaService } from 'src/app/services/ficha.service';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-edit-ficha',
  templateUrl: './edit-ficha.component.html',
  styleUrls: ['./edit-ficha.component.scss'],
})
export class EditFichaComponent implements OnInit {

  @Input() nombre!: string;
  @Input() description!: string;

  form : FormGroup;

  ficha!: Ficha;


  constructor(private modalCtrl: ModalController,
            private fb : FormBuilder,
            private fichaService : FichaMascotaService) {

              this.ficha = this.ficha;

                this.form = this.fb.group({
                  nombre:[this.ficha.nombre, Validators.required],
                  description:[this.ficha.description, Validators.required]

                })
             }

  ngOnInit() {}

  save(){
    const changes = this.form.value;
    this.fichaService.updateFicha(this.ficha.id ,changes)
    .subscribe(() =>{


    })

  }

//correcto
  close(){
    this.modalCtrl.dismiss();
  }


}
