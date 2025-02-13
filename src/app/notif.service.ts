import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor() { }
  
  muestraMensaje(mensaje: string){
    alert(mensaje);
    console.log(mensaje);
  }

}
