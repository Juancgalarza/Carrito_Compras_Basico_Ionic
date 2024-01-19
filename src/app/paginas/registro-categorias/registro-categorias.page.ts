import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { NuevoEditarCategoriaPage } from '../nuevo-editar-categoria/nuevo-editar-categoria.page';

@Component({
  selector: 'app-registro-categorias',
  templateUrl: './registro-categorias.page.html',
  styleUrls: ['./registro-categorias.page.scss'],
})
export class RegistroCategoriasPage implements OnInit {

  listaCategorias: any [] = [];
  objVacio = {};

  constructor(
    private servG: GeneralService,
    private catServ: CategoriaService,
    private modalController: ModalController,
    private alertController: AlertController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'primerMenu');
    this.listarCategorias();
  }

  listarCategorias() {
    this.catServ.getCategorias().subscribe(res => {
      this.listaCategorias = res.data['info'];
    });
  }

  async abrirModalCategorias(){
    this.objVacio = {};

    const modal = await this.modalController.create({
        component: NuevoEditarCategoriaPage,
        componentProps:{
        titulo: "Nueva Categoría",
        objCategoria: this.objVacio,
        categoriaId: 0
      },
      backdropDismiss:false
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.categoriaAgregada) {
        // Si el modal devuelve 'categoriaAgregada: true', actualiza la lista de categorías
        this.listarCategorias();
      }
    });
    return await modal.present();
  }

  async editarCategoria(dataCategoria:any){
    const modal = await this.modalController.create({
      component: NuevoEditarCategoriaPage,
      componentProps:{
        titulo: "Editar Categoría",
        objCategoria: dataCategoria,
        categoriaId: dataCategoria.id
      },
      backdropDismiss:false
    });
    return await modal.present();
  }

  async eliminarCategoria(id:any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de Eliminar La Categoría?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel', 
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.servG.showLoading();
            const categoria_id = id;
            this.catServ.eliminarCategoria(categoria_id).subscribe(res => {
              if(res.id > 0){ 
                this.servG.Mensaje(res.mensaje,"secondary");
                this.listarCategorias();
              }else{
                this.servG.Mensaje(res.mensaje,"warning")
              } () => {
                this.servG.hideLoading();
              }
            });
          }
        }, 
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }

}
