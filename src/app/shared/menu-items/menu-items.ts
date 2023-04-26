import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  
  { state: 'menu' , type: 'link', name: 'Inicio', icon: 'home' },
  { state: 'dashboard', name: 'Nuestra Entidad', type: 'link', icon: 'assignment_turned_in' },
  { state: 'stepper', type:'link', name: 'Contáctenos', icon: 'assignment' },
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
