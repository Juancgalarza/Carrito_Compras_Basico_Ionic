import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  registrarProducto(data: any){
    let URL = this.servG.URL_API + "guardarProducto";
    return this.http.post<any>(URL, this.servG.objectToFormData(data));
  }

  subirImagen(imagen: File) {
    let URL = this.servG.URL_API + "subirImagen";
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post<any>(URL, formData);
  }

  eliminarProducto(producto_id: any ){
    let URL = this.servG.URL_API + "eliminarProducto/" + producto_id;
    return this.http.post<any>(URL, {});
  }

  getProductos(){
    let URL = this.servG.URL_API + "listaProductos";
    return this.http.get<any>(URL);
  }

  getProductoCat1(){
    let URL = this.servG.URL_API + "listaProdCat1";
    return this.http.get<any>(URL);
  }

  getProductoCat2(){
    let URL = this.servG.URL_API + "listaProdCat2";
    return this.http.get<any>(URL);
  }

  getProductoCat3(){
    let URL = this.servG.URL_API + "listaProdCat3";
    return this.http.get<any>(URL);
  }

  getProductoCat4(){
    let URL = this.servG.URL_API + "listaProdCat4";
    return this.http.get<any>(URL);
  }

  getProductoCat5(){
    let URL = this.servG.URL_API + "listaProdCat5";
    return this.http.get<any>(URL);
  }

}
