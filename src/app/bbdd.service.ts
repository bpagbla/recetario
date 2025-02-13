import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

import { Receta } from './interfaces/receta';
import { Ingrediente } from './interfaces/ingrediente';

@Injectable({
  providedIn: 'root'
})

export class BbddService {


  constructor(private firestore: Firestore) { }
  ingredientes: Ingrediente[] = [];

  async getIngredientes() {

    const querySnapshot = await getDocs(collection(this.firestore, "listaIngredientes"));

   this.ingredientes = querySnapshot.docs.map((doc) => ({
      nombre: doc.data()['nombre'],
    }));

    return this.ingredientes;

    /*     querySnapshot.forEach((doc) =>{
          console.log(doc.id, " => ", doc.data());
        }) */

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
