import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { NotifService } from '../notif.service';
import { BbddService } from '../bbdd.service';
import { Ingrediente } from '../interfaces/ingrediente';
import { Receta } from '../interfaces/receta';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';



@Component({
  standalone: true,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatAutocompleteModule, MatSelectModule, FormsModule, ReactiveFormsModule]
})

export class FormularioComponent implements OnInit {
  nuevoIngrediente: string = '';

  constructor(private bbddService: BbddService, private notifService: NotifService, private route: ActivatedRoute, private router: Router) { }

  title = 'Añadir una Receta nueva';

  cuadroplato: string = "";
  cuadrocantidad: string[] = [];
  cuadropreparacion: string = "";
  cantidades: { [key: string]: string } = {};
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

      // Inicializar cantidad para ese ingrediente
      this.cantidades[this.cuadroNombre] = '';

      this.cuadroNombre = '';

      this.ingredientes.push(nuevoIngrediente);
      this.bbddService.insertaIngrediente(nuevoIngrediente);
      this.notifService.muestraMensaje("Ingrediente añadido a la base de datos")
    }

  }

  incluirReceta() {
    let nuevaReceta: Receta = {
      plato: this.cuadroplato,
      ingredientes: this.ingredientesSelec,
      cantidad: this.cantidades,
      preparacion: this.cuadropreparacion
    };
    this.recetas.push(nuevaReceta);
    this.bbddService.insertaReceta(nuevaReceta);
    this.notifService.muestraMensaje("Se ha añadido la receta a la base de datos")
    this.router.navigate([""]);

  }



}
