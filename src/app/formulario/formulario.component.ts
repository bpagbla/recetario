import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Receta } from '../interfaces/receta';
import { Firestore } from '@angular/fire/firestore';

import { BbddService } from '../bbdd.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [CommonModule, FormsModule,]
})

export class FormularioComponent {

  constructor(private bbddService: BbddService) { }

  title = 'Añadir una Receta nueva';

  cuadroplato: string = "";
  cuadroingredientes: string[] = [];
  cuadrocantidad: string[] = [];
  cuadropreparacion: string = "";

  recetas: Receta[] = [];

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
