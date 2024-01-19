import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'nuevo-usuario',
    loadChildren: () => import('./paginas/nuevo-usuario/nuevo-usuario.module').then( m => m.NuevoUsuarioPageModule)
  },
  {
    path: 'principal-administrador',
    loadChildren: () => import('./paginas/principal-administrador/principal-administrador.module').then( m => m.PrincipalAdministradorPageModule)
  },
  {
    path: 'principal-cliente',
    loadChildren: () => import('./paginas/principal-cliente/principal-cliente.module').then( m => m.PrincipalClientePageModule)
  },
  {
    path: 'catalogo-productos',
    loadChildren: () => import('./paginas/catalogo-productos/catalogo-productos.module').then( m => m.CatalogoProductosPageModule)
  },
  {
    path: 'registro-categorias',
    loadChildren: () => import('./paginas/registro-categorias/registro-categorias.module').then( m => m.RegistroCategoriasPageModule)
  },
  {
    path: 'registro-productos',
    loadChildren: () => import('./paginas/registro-productos/registro-productos.module').then( m => m.RegistroProductosPageModule)
  },
  {
    path: 'nuevo-editar-categoria',
    loadChildren: () => import('./paginas/nuevo-editar-categoria/nuevo-editar-categoria.module').then( m => m.NuevoEditarCategoriaPageModule)
  },
  {
    path: 'nuevo-editar-producto',
    loadChildren: () => import('./paginas/nuevo-editar-producto/nuevo-editar-producto.module').then( m => m.NuevoEditarProductoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./paginas/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'consultas-ventas',
    loadChildren: () => import('./paginas/consultas-ventas/consultas-ventas.module').then( m => m.ConsultasVentasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
