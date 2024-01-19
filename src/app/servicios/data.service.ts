import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //lista de productos al componente
  private listBagSource = new BehaviorSubject<any[]>([]);
  $getListBagSource = this.listBagSource.asObservable();

  private carrito: any[] = []; // Arreglo que almacena los productos en el carrito
  private carritoSource = new BehaviorSubject<any[]>(this.carrito);
  $carrito = this.carritoSource.asObservable();

  private cantidadEnCarritoSubject = new BehaviorSubject<number>(0);
  cantidadEnCarrito$ = this.cantidadEnCarritoSubject.asObservable();

  constructor() { }

  agregarProducto(producto: any) {
    const productoExistente = this.carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumenta su cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    // Actualiza la fuente del BehaviorSubject con el nuevo carrito
    this.carritoSource.next(this.carrito);
  }

  eliminarProducto(producto: any) {
    this.carrito = this.carrito.filter((item) => item.id !== producto.id);
    this.carritoSource.next(this.carrito);
  }

  getCarrito() {
    return this.carrito;
  }

  calcularSubtotal() {
    return this.carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
  }

  calcularIVA() {
    return this.calcularSubtotal() * 0.12;
  }

  calcularTotal() {
    return this.calcularSubtotal() + this.calcularIVA();
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoSource.next(this.carrito);
    this.cantidadEnCarritoSubject.next(0); // Puedes ajustar el valor según sea necesario.
  }
  
  


}
