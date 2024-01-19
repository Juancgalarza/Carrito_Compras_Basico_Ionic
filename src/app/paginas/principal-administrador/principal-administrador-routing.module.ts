import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalAdministradorPage } from './principal-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalAdministradorPageRoutingModule {}
