import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listaMiCarrito: any [] = [];
  imageUrl: string = '';
  usuario_id: any;

  constructor(
    private dataServ: DataService,
    private router: Router,
    private servG: GeneralService,
    private ventaServ: VentaService,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.cargarMiCarrito();

    const localString = localStorage.getItem('data');
    if (localString !== null) {
      const local = JSON.parse(localString);
      this.usuario_id = local[0].id;
    }
  }

  cargarMiCarrito(){
    this.dataServ.$carrito.subscribe(res => {
      this.listaMiCarrito = res;
    })
  }

  irProductos(){
    this.router.navigate(['/catalogo-productos']);
  }

  cargarImagenProducto(producto: any){
    const rutaBaseImagenes = this.servG.URL_API + 'imagenes/productos/';
    return this.imageUrl = rutaBaseImagenes + producto.imagen;
  }

  calcularSubtotal(){
    return this.dataServ.calcularSubtotal();
  }
  
  calcularIVA(){
    return this.dataServ.calcularIVA();
  }

  calcularTotal() {
    return this.dataServ.calcularTotal();
  }

  irACatlogo(){
    this.servG.irA('/catalogo-productos');
  }

  async guardarCompra() {
    const detalle_venta = this.listaMiCarrito.map(producto => ({
      productos_id: producto.id,
      cantidad: producto.cantidad,
      precio: producto.precio,
      total: producto.cantidad * producto.precio
    }));
  
    const objCompra = {
      usuario_id: this.usuario_id,
      estado_ventas_id: 3,
      subtotal: this.calcularSubtotal(),
      iva: this.calcularIVA(),
      total: this.calcularTotal(),
      estado: 'A',
      detalle_venta: detalle_venta
    };
  
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar Compra',
      message: '¿Estás seguro de que quieres realizar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Compra cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Realiza la compra si el usuario confirma
            this.guardandoCompra(objCompra);
          }
        }
      ]
    });
  
    await confirmAlert.present();
  }
  

  guardandoCompra(objCompra: any) {
    this.ventaServ.registrarVenta(objCompra).subscribe(res => {
      if (res.id > 0) {
        this.servG.Mensaje(res.mensaje, "primary");
         // Después de confirmar que la compra se ha guardado con éxito, borra el carrito
        this.dataServ.limpiarCarrito();
        this.servG.irA('/catalogo-productos');
      } else {
        this.servG.Mensaje(res.mensaje, "warning");
      }
    });
  }

  

}
