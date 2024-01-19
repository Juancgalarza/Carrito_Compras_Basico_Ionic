import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/servicios/data.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {

  listBag: any[] = [];
  subscription!: Subscription;
  imageUrl: string = '';
  @Input() product: any;

  constructor(
    private dataServ: DataService,
    private servG: GeneralService
  ) { }

  ngOnInit() {
    this.cargarImagenProducto();
    this.subscription = this.dataServ.$getListBagSource.subscribe(data => {
      this.listBag = data;
    });
  }

  cargarImagenProducto() {
    const rutaBaseImagenes = this.servG.URL_API + 'imagenes/productos/';
    this.imageUrl = rutaBaseImagenes + this.product.imagen;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  agregarAlCarrito(item: any) {
    this.dataServ.agregarProducto(item);
  }

}
