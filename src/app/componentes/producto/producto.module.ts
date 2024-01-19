import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './producto.component';


@NgModule({
  declarations: [ProductoComponent],
  exports: [ProductoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class ProductoModule { }
