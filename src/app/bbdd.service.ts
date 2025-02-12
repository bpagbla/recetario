import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

import { Receta } from './interfaces/receta';
import { Ingrediente } from './interfaces/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class BbddService {


  constructor(private firestore: Firestore) { }

  async getIngredientes() {
    const ingredientesRef = collection(this.firestore, "ingredientes");
    const snapshot = await getDocs(ingredientesRef);
    
    return snapshot.docs.map(doc => doc.data()['nombre']);
  }

 insertaIngrediente(nuevoIngrediente: Ingrediente) {
    try {
      setDoc(doc(this.firestore, "listaIngredientes", nuevoIngrediente.nombre), {
        nombre: nuevoIngrediente.nombre
      });
      console.log('Dato OK');
    } catch (error) {
      console.log('Error al agregar documento', error);
    }
  }

  insertaReceta(receta: Receta) {
    try {
      setDoc(doc(this.firestore, "listaRecetas", receta.plato), {
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
