import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEditarProductoPage } from './nuevo-editar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEditarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEditarProductoPageRoutingModule {}
