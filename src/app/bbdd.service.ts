import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from 'firebase/firestore';

import { Receta } from './interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class bbddService {

  constructor(private firestore: Firestore) { }

  insertaReceta(receta:Receta){
    try{
      setDoc(doc(this.firestore, "listaRecetas", receta.plato), {
        plato:receta.plato,
        ingredientes: receta.ingredientes,
        cantidad: receta.cantidad,
        preparacion: receta.preparacion
      });
      console.log('Dato OK');
    }catch(error){
      console.log('Error al agregar documento', error);
    }
  }

}
