import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { GeneralService } from 'src/app/servicios/general.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-nuevo-editar-producto',
  templateUrl: './nuevo-editar-producto.page.html',
  styleUrls: ['./nuevo-editar-producto.page.scss'],
})
export class NuevoEditarProductoPage implements OnInit {

  titulo: string = '';
  @Input() objProducto: any = {};
  @Input() productoId: any;
  categorias: any [] = [];
  productoDefault = 'producto-default.jpg';
  imagenTemp: any;

  constructor(
    private modalController: ModalController,
    private servG: GeneralService,
    private catServ: CategoriaService,
    private prodServ: ProductoService,
  ) { }

  ngOnInit() {
    this.listarCategorias();
  }

  listarCategorias() {
    this.catServ.getCategorias().subscribe(res => {
      this.categorias = res.data['info'];
    });
  }

  onImageChange2(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        //this.objProducto.imagen = e.target.result; // Asigna la vista previa de la imagen a objProducto.imagen
        this.objProducto.imagen = file.name;
      };
  
      reader.readAsDataURL(file);
    } else {
      // Si el usuario no seleccionó ninguna imagen, puedes asignar una imagen por defecto.
      this.objProducto.imagen = 'assets/img/producto-default.jpg'; // Reemplaza con la URL de tu imagen por defecto
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      // Asigna el nombre del archivo (sin la ruta completa) a objProducto.imagen
      this.objProducto.imagen = file.name;
      this.imagenTemp = file;
      console.log(this.imagenTemp);
      
    } else {
      // Si el usuario no seleccionó ninguna imagen, puedes asignar una imagen por defecto.
      this.objProducto.imagen = this.productoDefault; // Reemplaza con el nombre por defecto que desees
    }
  }
  
  guardarProducto() {
    if (this.productoId ===  0) {
      //nuevo
      if (!this.objProducto.nombre || this.objProducto.nombre.trim() === '') {
        this.servG.Mensaje('Ingrese un nombre al producto','danger');
      } else if(!this.objProducto.categoria_id || this.objProducto.categoria_id === 0) {
        this.servG.Mensaje('Seleccione una categoría','danger');
      } else if(!this.objProducto.stock || isNaN(Number(this.objProducto.stock))) {
        this.servG.Mensaje('Ingrese un stock válido','danger');
      } else if(!this.objProducto.precio || isNaN(Number(this.objProducto.precio))) {
        this.servG.Mensaje('Ingrese un precio válido','danger');
      } else if(!this.objProducto.descripcion || this.objProducto.descripcion.trim() === '') {
        this.servG.Mensaje('Ingrese una descripción','danger');
      } else {
        // Verifica si la imagen es la imagen por defecto
        const esImagenPorDefecto = this.objProducto.imagen === undefined; 

        const objProductos = {
          categoria_id: this.objProducto.categoria_id,
          nombre: this.objProducto.nombre,
          descripcion: this.objProducto.descripcion,
          imagen: esImagenPorDefecto ? this.productoDefault : this.objProducto.imagen,
          stock: Number(this.objProducto.stock),
          precio: Number(this.objProducto.precio),
          estado: 'A'
        };

        console.log('objeto producto',objProductos);
        const imagen = this.imagenTemp; // obtén la imagen desde tu formulario
        this.guardandoProducto(objProductos, imagen);
      }
    }
  }

  guardandoProducto(objProductos: any, imagen: File) {
    this.prodServ.registrarProducto(objProductos).subscribe(res => {
      if (res.info.id > 0) {
        this.servG.Mensaje(res.mensaje, "primary");
        this.subirImagen(imagen);
        this.modalController.dismiss({ productoAgregado: true });
      } else {
        this.servG.Mensaje(res.mensaje, "warning");
      }
    });
  }
  
  subirImagen(imagen: File) {
    this.prodServ.subirImagen(imagen).subscribe(resImagen => {

      if (resImagen.id > 0) {
        this.servG.Mensaje("Imagen subida con éxito", "primary");
      } else {
        this.servG.Mensaje("Error al subir la imagen", "danger");
      }
    });
  }
  
  cancelar(){
    this.modalController.dismiss();
  }

}
