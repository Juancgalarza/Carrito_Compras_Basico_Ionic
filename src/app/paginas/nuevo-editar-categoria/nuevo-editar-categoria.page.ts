import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-nuevo-editar-categoria',
  templateUrl: './nuevo-editar-categoria.page.html',
  styleUrls: ['./nuevo-editar-categoria.page.scss'],
})
export class NuevoEditarCategoriaPage implements OnInit {

  titulo: string = '';
  @Input() objCategoria: any = {};
  @Input() categoriaId: any;

  constructor(
    private modalController:ModalController,
    private servG: GeneralService,
    private catServ: CategoriaService,
  ) { }

  ngOnInit() {
  }

  guardarCategoria(){
    if (this.categoriaId === 0) {
      //nuevo
      if (!this.objCategoria.categoria || this.objCategoria.categoria.trim() === '') {
        this.servG.Mensaje('Ingrese una categoría','danger');
      } else {
        const objCategorias = {
          categoria: this.objCategoria.categoria,
          estado: 'A'
        }
        this.guardandoCategoria(objCategorias);
      }
    } else {
      //editar
      const categoria_id = this.categoriaId;
      const objCategorias = {
        categoria: this.objCategoria.categoria,
        estado: 'A'
      }
      this.editandoCategoria(objCategorias, categoria_id);
    }
  }

  guardandoCategoria(objCategorias:any){
    this.catServ.registarCategoria(objCategorias).subscribe(res => {
      if(res.info.id > 0){ 
        this.servG.Mensaje(res.mensaje,"primary");
        this.modalController.dismiss({ categoriaAgregada: true });
      }else{
        this.servG.Mensaje(res.mensaje,"warning")
      }
    });
  }

  editandoCategoria(objCategorias:any, categoria_id:any){
    this.catServ.editarCategoria(objCategorias, categoria_id).subscribe(res => {
      if(res.id > 0){ 
        this.servG.Mensaje(res.mensaje,"primary");
        this.modalController.dismiss();
      }else{
        this.servG.Mensaje(res.mensaje,"warning")
      }
    });
  }

  cancelar(){
    this.modalController.dismiss();
  }

}
