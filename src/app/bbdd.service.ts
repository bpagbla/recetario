import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

import { Receta } from './interfaces/receta';
import { Ingrediente } from './interfaces/ingrediente';
import { addDoc } from 'firebase/firestore';

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

  async insertaReceta(receta: Receta) {
    try {
      const doc = await addDoc(collection(this.firestore, "listaRecetas"), {
        plato: receta.plato,
        ingredientes: receta.ingredientes,
        cantidad: receta.cantidad,
        preparacion: receta.preparacion
      });
      await updateDoc(doc, { id: doc.id });
      console.log('Dato OK');
    } catch (error) {
      console.log('Error al agregar documento', error);
    }
  }

}
