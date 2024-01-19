import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  getCategorias() {
    let URL = this.servG.URL_API + "listaCategorias";
    return this.http.get<any>(URL);
  }

  registarCategoria(data: any) {
    let URL = this.servG.URL_API + "guardarCategoria";
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }

  editarCategoria(data:any, categoria_id: any) {
    let URL = this.servG.URL_API + "editarCategoria/" + categoria_id;
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }

  eliminarCategoria(categoria_id: any ){
    let URL = this.servG.URL_API + "eliminarCategoria/" + categoria_id;
    return this.http.post<any>(URL, {});
  }
}
