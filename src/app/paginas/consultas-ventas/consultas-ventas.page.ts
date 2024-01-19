import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servicios/general.service';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-consultas-ventas',
  templateUrl: './consultas-ventas.page.html',
  styleUrls: ['./consultas-ventas.page.scss'],
})
export class ConsultasVentasPage implements OnInit {

  fechaInicio: any;
  fechaFin: any;
  dataConsulta: any [] = [];

  constructor(
    private servG: GeneralService,
    private ventaServ: VentaService
  ) { }

  ngOnInit() {
  }

  consultarFechas() {
    if (!this.fechaInicio) {
      this.servG.Mensaje('Seleccione una fecha inicio','danger');
    } else if (!this.fechaFin) {
      this.servG.Mensaje('Selecciones una fecha fin','danger');
    } else {
      this.ventaServ.consultaVentasFecha(this.fechaInicio, this.fechaFin).subscribe(res => {
        this.dataConsulta = res.data.info;
        console.log(this.dataConsulta);
        
      });
    }
  }

}
