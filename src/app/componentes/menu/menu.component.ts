import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/interfaces';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  listaMenu: Item[] = [];

  constructor(
    private menuServ: MenuService
  ) { }

  ngOnInit() {
    this.getMenus();
  }

  getMenus() {
    // Verifica si los datos del menú están almacenados en localStorage
    const menuDataString = localStorage.getItem('menuData');
    if (menuDataString) {
      const menuData = JSON.parse(menuDataString);
      this.listaMenu = menuData.info.items;
    }

    // Suscríbete a los cambios del servicio para futuras actualizaciones
    this.menuServ.menuData$.subscribe((menuData) => {    
      if (menuData) {
        this.listaMenu = menuData.info.items;
        // Guarda los datos en localStorage para futuras visitas
        localStorage.setItem('menuData', JSON.stringify(menuData));
      }
    });

  }

}
