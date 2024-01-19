import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoProductosPage } from './catalogo-productos.page';

describe('CatalogoProductosPage', () => {
  let component: CatalogoProductosPage;
  let fixture: ComponentFixture<CatalogoProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatalogoProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
