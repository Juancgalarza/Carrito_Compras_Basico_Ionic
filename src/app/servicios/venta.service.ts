import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  registrarVenta(data: any){
    let URL = this.servG.URL_API + "guardarVenta";
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }

  consultaVentasFecha(inicio: any, fin: any){
    let URL = this.servG.URL_API + "consultaVenta/" + inicio + '/' + fin;
    return this.http.get<any>(URL);
  }
}
