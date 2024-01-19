import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultasVentasPageRoutingModule } from './consultas-ventas-routing.module';

import { ConsultasVentasPage } from './consultas-ventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultasVentasPageRoutingModule
  ],
  declarations: [ConsultasVentasPage]
})
export class ConsultasVentasPageModule {}
