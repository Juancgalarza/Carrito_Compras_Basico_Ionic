import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalAdministradorPageRoutingModule } from './principal-administrador-routing.module';

import { PrincipalAdministradorPage } from './principal-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalAdministradorPageRoutingModule
  ],
  declarations: [PrincipalAdministradorPage]
})
export class PrincipalAdministradorPageModule {}
