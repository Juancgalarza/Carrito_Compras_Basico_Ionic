import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-principal-administrador',
  templateUrl: './principal-administrador.page.html',
  styleUrls: ['./principal-administrador.page.scss'],
})
export class PrincipalAdministradorPage implements OnInit {

  constructor(
    private servG: GeneralService,
    private alertController: AlertController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'primerMenu');
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Applicacón Movil',
      message: '¿Estás seguro de Cerrar La Sesión?',
      cssClass: 'my-custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', // Establece el rol "cancel" para el botón Cancel
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            localStorage.clear();
            this.servG.irA('/login');
            this.servG.Mensaje('Sesion Cerrada Con Éxito','primary');
          }
        }
      ],
      backdropDismiss: false,
    });
  
    await alert.present();
  }

}
