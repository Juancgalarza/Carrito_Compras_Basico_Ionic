import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasVentasPage } from './consultas-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultasVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasVentasPageRoutingModule {}
