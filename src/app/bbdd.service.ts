import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

import { Receta } from './interfaces/receta';
import { Ingrediente } from './interfaces/ingrediente';

import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BbddService {


  constructor(private firestore: Firestore) { }

  /* INGREDIENTES */
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

  /* RECETAS */
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



  recetas: Receta[] = [];

  async getRecetas() {
    const querySnapshot = await getDocs(collection(this.firestore, "listaRecetas"));

    this.recetas = querySnapshot.docs.map((doc) => ({
      id: doc.data()['id'],
      plato: doc.data()['plato'],
      ingredientes: doc.data()['ingredientes'],
      cantidad: doc.data()['cantidad'],
      preparacion: doc.data()['preparacion']
    }));

    return this.recetas;
  }

  async getReceta(id: string): Promise<any> {
/*     const documentoRef = doc(this.firestore, "listaRecetas", id);
    const documentoSnapshot = await getDoc(documentoRef);

    if (documentoSnapshot.exists()) {
      return { id: documentoSnapshot.id, ...documentoSnapshot.data() };
    } else {
      return null;
    }
  } */

    try {
      const documentoRef = doc(this.firestore, "listaRecetas", id);
      const documentoSnapshot = await getDoc(documentoRef);
      if (documentoSnapshot.exists()) {
        return { id: documentoSnapshot.id, ...documentoSnapshot.data() };
      } else {
        console.error("No existe la receta con ese ID");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      return null;
    }
  }

}
