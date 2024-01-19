import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalClientePageRoutingModule } from './principal-cliente-routing.module';

import { PrincipalClientePage } from './principal-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalClientePageRoutingModule
  ],
  declarations: [PrincipalClientePage]
})
export class PrincipalClientePageModule {}
