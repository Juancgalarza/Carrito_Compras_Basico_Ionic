import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEditarCategoriaPageRoutingModule } from './nuevo-editar-categoria-routing.module';

import { NuevoEditarCategoriaPage } from './nuevo-editar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoEditarCategoriaPageRoutingModule
  ],
  declarations: [NuevoEditarCategoriaPage]
})
export class NuevoEditarCategoriaPageModule {}
