import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/* INTERFACES */
import { Receta } from '../interfaces/receta';

/* SERVICIOS */
import { NotifService } from '../notif.service';
import { BbddService } from '../bbdd.service';
import { RouterLink } from '@angular/router';
import { Ingrediente } from '../interfaces/ingrediente';

@Component({
  standalone: true,
  selector: 'app-recetas',
  imports: [CommonModule, RouterLink],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})

export class RecetasComponent {
  constructor(private bbddService: BbddService, private notifService: NotifService) { }

  recetas: Receta[] = [];
 /*  recetasFiltradas: Receta[] = [];  // Lista de recetas filtradas
  ingredientes: Ingrediente[] = [];
  ingredientesSelec: Ingrediente[] = [];  // Objeto para almacenar los ingredientes seleccionados */

  async ngOnInit() {
    this.recetas = await this.bbddService.getRecetas();
    console.log('Recetas cargadas:', this.recetas);
    /* this.ingredientes = await this.bbddService.getIngredientes(); */
  }
  
/*   filtrarRecetas(): void {
    this.recetasFiltradas = this.recetas.filter(receta => {
      // Comprobamos si la receta contiene los ingredientes seleccionados
      return receta.ingredientes.some(ingrediente => 
        this.ingredientesSelec
      );
    });
  } */

}
