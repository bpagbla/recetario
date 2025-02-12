import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Receta } from '../interfaces/receta';
import { Firestore } from '@angular/fire/firestore';

import { BbddService } from '../bbdd.service';
import { Ingrediente } from '../interfaces/ingrediente';

@Component({
  standalone:true,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [CommonModule, FormsModule,]
})

export class FormularioComponent implements OnInit{
  nuevoIngrediente: string = '';

  constructor(private bbddService: BbddService) { }

  title = 'Añadir una Receta nueva';

  cuadroplato: string = "";
  cuadroingredientes: string[] = [];
  cuadrocantidad: string[] = [];
  cuadropreparacion: string = "";

  cuadroNombre: string = "";

  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];

  async ngOnInit() {
    this.ingredientes = await this.bbddService.getIngredientes(); // Cargar los ingredientes al iniciar
  }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim()) {
      let nuevoIngrediente: Ingrediente = {
        nombre: this.cuadroNombre
      };
      this.ingredientes.push(nuevoIngrediente);
      this.bbddService.insertaIngrediente(nuevoIngrediente);
    }

  }

  async incluirReceta() {
    let nuevaReceta: Receta = {
      plato: this.cuadroplato,
      ingredientes: this.cuadroingredientes,
      cantidad: this.cuadrocantidad,
      preparacion: this.cuadropreparacion
    };
    this.recetas.push(nuevaReceta);
    this.bbddService.insertaReceta(nuevaReceta);

  }

}
