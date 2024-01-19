export interface ComponenteMenu {
  mensaje: string;
  total: number;
  info: Info;
}

export interface Info {
  items: Item[];
}

export interface Item {
  id: number;
  roles_id: number;
  nombre: string;
  pagina: string;
  icono: string;
  estado: string;
}