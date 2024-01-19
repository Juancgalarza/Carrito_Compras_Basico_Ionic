import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding, MenuController, ModalController } from '@ionic/angular';
import { GeneralService } from 'src/app/servicios/general.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { NuevoEditarProductoPage } from '../nuevo-editar-producto/nuevo-editar-producto.page';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.page.html',
  styleUrls: ['./registro-productos.page.scss'],
})
export class RegistroProductosPage implements OnInit {

  @ViewChild('itemSliding') itemSliding!: IonItemSliding;
  listaProductos: any [] = [];
  imageUrl: string = '';
  objVacio = {};

  constructor(
    private servG: GeneralService,
    private prodServ: ProductoService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'primerMenu');
    this.listarProductos();
  }

  listarProductos(){
    this.prodServ.getProductos().subscribe(res => {
      this.listaProductos = res.data['info'];
    });
  }

  cargarImagenProducto(producto: any){
    const rutaBaseImagenes = this.servG.URL_API + 'imagenes/productos/';
    return this.imageUrl = rutaBaseImagenes + producto.imagen;
  }

  async abrirModalProductos() {
    this.objVacio = {};

    const modal = await this.modalController.create({
        component: NuevoEditarProductoPage,
        componentProps:{
        titulo: "Nuevo Producto",
        objProducto: this.objVacio,
        productoId: 0
      },
      backdropDismiss:false
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.productoAgregado) {
        // Si el modal devuelve 'productoAgregado: true', actualiza la lista de categorías
        this.listarProductos();
      }
    });

    return await modal.present();
  }

  async eliminarProducto(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de Eliminar El Producto?',
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
            const producto_id = id;
            this.prodServ.eliminarProducto(producto_id).subscribe(res => {
              if(res.id > 0){ 
                this.servG.Mensaje(res.mensaje,"secondary");
                this.listarProductos();
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
