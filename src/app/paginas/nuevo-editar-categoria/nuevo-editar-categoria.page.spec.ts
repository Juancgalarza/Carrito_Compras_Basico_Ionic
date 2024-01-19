import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoEditarCategoriaPage } from './nuevo-editar-categoria.page';

describe('NuevoEditarCategoriaPage', () => {
  let component: NuevoEditarCategoriaPage;
  let fixture: ComponentFixture<NuevoEditarCategoriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoEditarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
