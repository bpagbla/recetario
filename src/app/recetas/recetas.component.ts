import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/* INTERFACES */
import { Receta } from '../interfaces/receta';

/* SERVICIOS */
import { NotifService } from '../notif.service';
import { BbddService } from '../bbdd.service';
import { RouterLink } from '@angular/router';
import { Ingrediente } from '../interfaces/ingrediente';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-recetas',
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatAutocompleteModule, MatSelectModule, FormsModule],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})

export class RecetasComponent {
  constructor(private bbddService: BbddService, private notifService: NotifService) { }

  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];  // Lista de recetas filtradas
  ingredientes: Ingrediente[] = [];
  ingredientesSelec: Ingrediente[] = [];  // Objeto para almacenar los ingredientes seleccionados

  async ngOnInit() {
    this.recetas = await this.bbddService.getRecetas();
    console.log('Recetas cargadas:', this.recetas);
    this.ingredientes = await this.bbddService.getIngredientes();
    this.recetasFiltradas = [...this.recetas];
  }

  filtrarRecetas(): void {
    if (this.ingredientesSelec.length === 0) {

      this.recetasFiltradas = [...this.recetas];
    } else {

      this.recetasFiltradas = this.recetas.filter(receta => {
        const cumpleFiltro = this.ingredientesSelec.some(ingSelec =>
          receta.ingredientes.some(ingReceta =>
            ingReceta.nombre === ingSelec.nombre
          )
        );
        return cumpleFiltro;
      });
    }

  }



}
