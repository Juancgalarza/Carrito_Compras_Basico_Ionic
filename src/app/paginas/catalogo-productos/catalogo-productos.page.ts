import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.page.html',
  styleUrls: ['./catalogo-productos.page.scss'],
})
export class CatalogoProductosPage implements OnInit {

  type: string = '';
  listaPro: any[] = [];
  textBuscar: string = ""; 
  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;

  cantidadEnCarrito: number = 0;
  totalItemsInCarrito: number = 0; // Variable para la cantidad total en el carrito

  constructor(
    private prodServ: ProductoService,
    private dataServ: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.totalProductosCarrito();
    this.type = 'hamburguesas';
    this.cargarProductos(this.type);
  }

  segmentChanged(ev: any) {
    this.listaPro = []; 
    this.textBuscar = "";
    this.searchbar.value = ""; //Resetea el valor del input
    const category = ev.detail.value;
    this.cargarProductos(category);
  }

  buscar(event:any){
    this.textBuscar = event.detail.value;
  }

  cargarProductos(category: string) {
    let loader: any;
    switch (category) {
      case 'hamburguesas':
        loader = this.prodServ.getProductoCat1();
        break;
      case 'salchipapas':
        loader = this.prodServ.getProductoCat2();
        break;
      case 'pizza':
        loader = this.prodServ.getProductoCat3();
        break;
      case 'piqueos':
        loader = this.prodServ.getProductoCat4();
        break;
      case 'bebidas':
        loader = this.prodServ.getProductoCat5();
        break;
      default:
        // Manejo de error o carga predeterminada
        break;
    }

    if (loader) {
      loader.subscribe( (res: any) => {
          this.listaPro = res.data['info'];
        }
      );
    }
  }

  totalProductosCarrito(){
    this.dataServ.$carrito.subscribe((carrito) => {
      console.log(carrito);
      
      this.totalItemsInCarrito = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
      );
    });
  }

  verCarrito(){
    this.router.navigate(['/carrito']);
  }

}
