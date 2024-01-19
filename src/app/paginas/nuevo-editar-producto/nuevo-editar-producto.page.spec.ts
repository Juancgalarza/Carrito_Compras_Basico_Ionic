import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoEditarProductoPage } from './nuevo-editar-producto.page';

describe('NuevoEditarProductoPage', () => {
  let component: NuevoEditarProductoPage;
  let fixture: ComponentFixture<NuevoEditarProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoEditarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
