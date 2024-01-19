import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponenteMenu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuDataSubject = new BehaviorSubject<ComponenteMenu | null>(null);
  menuData$: Observable<ComponenteMenu | null> = this.menuDataSubject.asObservable();

  constructor() { }

  setMenuData(data: ComponenteMenu) {
    this.menuDataSubject.next(data);
    localStorage.setItem('menuData', JSON.stringify(data));
  } 
}
