import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/Solicitudservice';


@Component({
  selector: 'app-recibir-solicitud',
  templateUrl: './recibir-solicitud.component.html',
  styleUrls: ['./recibir-solicitud.component.scss'],
})
export class RecibirSolicitudComponent implements OnInit {

  solicitudes!: any[];

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit() {

    this.getSolicitudes();
  }

  getSolicitudes() {

}

}
