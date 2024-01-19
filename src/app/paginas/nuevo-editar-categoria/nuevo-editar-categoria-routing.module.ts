import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoEditarCategoriaPage } from './nuevo-editar-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoEditarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoEditarCategoriaPageRoutingModule {}
