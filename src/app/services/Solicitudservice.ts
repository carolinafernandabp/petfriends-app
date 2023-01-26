import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, map, Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion';
import { convertSnaps } from './db-util';
import { Solicitud } from '../models/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  getSolicitudes(){

  }

}

