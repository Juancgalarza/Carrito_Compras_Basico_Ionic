import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  iniciarSesion(data: any){
    let URL = this.servG.URL_API + "login";
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }

  registarUsuario(data: any){
    let URL = this.servG.URL_API + "guardarUsuario";
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }
}
