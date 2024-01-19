import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.page.html',
  styleUrls: ['./nuevo-usuario.page.scss'],
})
export class NuevoUsuarioPage implements OnInit {

  cedula: string = '';
  nombres: string = '';
  apellidos: string = '';
  celular: string = '';
  direccion: string = '';
  correo: string = '';
  usuario: string = '';
  clave: string = '';
  passwordVisible: boolean = false;

  constructor(
    private servG: GeneralService,
    private loginServ: LoginService,
    private menuCtrl: MenuController
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

  registrarUsuario() {
    if (this.cedula === '') {
      this.servG.Mensaje('Ingrese una cédula','danger');
    } else if(this.nombres === '') {
      this.servG.Mensaje('Ingrese los nombres','danger');
    } else if(this.apellidos === '') {
      this.servG.Mensaje('Ingrese los apellidos','danger');
    } else if(this.celular === '') {
      this.servG.Mensaje('Ingrese un teléfono','danger');
    } else if(this.direccion === '') {
      this.servG.Mensaje('Ingrese una dirección','danger');
    } else if(this.usuario === '') {
      this.servG.Mensaje('Ingrese un usuario','danger');
    } else if(this.correo === '') {
      this.servG.Mensaje('Ingrese un correo','danger');
    } else if(this.clave === '') {
      this.servG.Mensaje('Ingrese una clave','danger');
    } else {
      const objUsuario = {
        cedula: this.cedula,
        nombres: this.nombres,
        apellidos: this.apellidos,
        celular: this.celular,
        direccion: this.direccion,
        estadoP: 'A',
        roles_id: '2',
        usuario: this.usuario,
        correo: this.correo,
        clave: this.clave,
        estadoU: 'A'
      }
      this.registrando(objUsuario);
    }
  }

  registrando(objUsuario: any) {
    this.loginServ.registarUsuario(objUsuario).subscribe(res => {
      if(res.info.id > 0){ 
        this.servG.Mensaje(res.mensaje,"primary");
        this.servG.irA('/login');
        //this.resetCampos();
      }else{
        this.servG.Mensaje(res.mensaje,"warning")
      }
    });
  }

}
