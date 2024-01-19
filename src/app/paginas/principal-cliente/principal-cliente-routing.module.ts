import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalClientePage } from './principal-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalClientePageRoutingModule {}
