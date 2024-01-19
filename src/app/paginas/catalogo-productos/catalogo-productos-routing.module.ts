import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoProductosPage } from './catalogo-productos.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogoProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoProductosPageRoutingModule {}
