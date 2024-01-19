import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEditarProductoPageRoutingModule } from './nuevo-editar-producto-routing.module';

import { NuevoEditarProductoPage } from './nuevo-editar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoEditarProductoPageRoutingModule
  ],
  declarations: [NuevoEditarProductoPage]
})
export class NuevoEditarProductoPageModule {}
