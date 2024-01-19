import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ComponenteMenu } from 'src/app/interfaces/interfaces';
import { GeneralService } from 'src/app/servicios/general.service';
import { LoginService } from 'src/app/servicios/login.service';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
  clave: string = '';
  passwordVisible: boolean = false;

  constructor(
    private servG: GeneralService,
    private loginServ: LoginService,
    private menuCtrl: MenuController,
    private menuServ: MenuService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'primerMenu');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getPasswordType() {
    return this.passwordVisible ? 'text' : 'password';
  }

  inicarSesion() {
    if (this.usuario === '') {
      this.servG.Mensaje('Ingrese un usuario','danger');
    } else if(this.clave === '') {
      this.servG.Mensaje('Ingrese una clave','danger');
    } else {
      const objLogin = {
        usuario: this.usuario,
        clave: this.clave,
      }
      this.iniciandoSesion(objLogin);
    }
  }

  iniciandoSesion(objLogin:any){
    this.loginServ.iniciarSesion(objLogin).subscribe(res => {
      if(res.data.length > 0){
        localStorage.setItem('data', JSON.stringify(res.data));
        this.servG.getMenuOpts(res.data[0].roles_id).subscribe((respuesta:ComponenteMenu) => {
          this.menuServ.setMenuData(respuesta);
        }); 
        this.servG.Mensaje(res.mensaje,"primary");
        if (res.data[0].roles_id === 1) {
          this.navCtrl.navigateRoot('/principal-administrador', { animated: true });
        } else if (res.data[0].roles_id === 2) {
          this.navCtrl.navigateRoot('/principal-cliente', { animated: true });
        } else {
          console.log('otro rol por definir');
        }
        //this.resetCampos();
      }else{
        this.servG.Mensaje(res.mensaje,"warning")
      }
    });
  }

  irARegistro() {
    this.servG.irA('nuevo-usuario');
  }

}
