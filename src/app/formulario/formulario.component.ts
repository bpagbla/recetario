import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Receta } from '../interfaces/receta';
import { Firestore } from '@angular/fire/firestore';

import { BbddService } from '../bbdd.service';
import { Ingrediente } from '../interfaces/ingrediente';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule]
})

export class FormularioComponent implements OnInit {
  nuevoIngrediente: string = '';

  constructor(private bbddService: BbddService) { }

  title = 'Añadir una Receta nueva';

  cuadroplato: string = "";
  cuadrocantidad: string[] = [];
  cuadropreparacion: string = "";

  cuadroNombre: string = "";

  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];
  ingredientesSelec: Ingrediente[] = [];
  listaIngredientes = new FormControl('');

  async ngOnInit() {

    this.ingredientes = await this.bbddService.getIngredientes();
  }

  agregarIngrediente() {
    if (this.cuadroNombre.trim()) {
      let nuevoIngrediente: Ingrediente = {
        nombre: this.cuadroNombre.trim()
      };
      this.ingredientes.push(nuevoIngrediente);
      this.bbddService.insertaIngrediente(nuevoIngrediente);
    }

  }

  incluirReceta() {
    let nuevaReceta: Receta = {
      plato: this.cuadroplato,
      ingredientes: this.ingredientesSelec,
      cantidad: this.cuadrocantidad,
      preparacion: this.cuadropreparacion
    };
    this.recetas.push(nuevaReceta);
    this.bbddService.insertaReceta(nuevaReceta);

  }

}
