import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ComponenteMenu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  URL_API: string = 'http://localhost/API_CARRITO/';
  private loading!: HTMLIonLoadingElement;

  constructor(
    private route: Router,
    private toast: ToastController,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  getMenuOpts(roles_id:any){
    let URL = this.URL_API + "menu/" + roles_id;
    return this.http.get<ComponenteMenu>(URL);
  }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  }

  //funcion emite mensaje
  async Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }

  irA(url: string) {
    this.route.navigateByUrl(url);
  }

  //muestra el loanding
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000,
      spinner: 'circles',
    });

    this.loading.present();
  }

  //oculta el loading
  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}
