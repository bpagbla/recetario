import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';

import { Receta } from './interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class BbddService {

  constructor(private firestore: Firestore) { }

  

  async insertaReceta(receta: Receta) {
    try {
      await setDoc(doc(this.firestore, "listaRecetas", receta.plato), {
        plato: receta.plato,
        ingredientes: receta.ingredientes,
        cantidad: receta.cantidad,
        preparacion: receta.preparacion
      });
      console.log('Dato OK');
    } catch (error) {
      console.log('Error al agregar documento', error);
    }
  }

}
