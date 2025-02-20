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
    MatAutocompleteModule, MatSelectModule, ReactiveFormsModule]
})

export class FormularioComponent implements OnInit {
  nuevoIngrediente: string = '';

  constructor(private bbddService: BbddService, private notifService: NotifService, private route: ActivatedRoute, private router: Router) { }

  title = 'Añadir una Receta nueva';

  cuadroplato = new FormControl('', Validators.required);
  cuadropreparacion = new FormControl('', Validators.required);

  cuadrocantidad: string[] = [];

  cantidades: { [key: string]: FormControl } = {};

  cuadroNombre = new FormControl('', Validators.required);

  recetas: Receta[] = [];
  ingredientes: Ingrediente[] = [];
  ingredientesSelec: Ingrediente[] = [];

  listaIngredientes = new FormControl<Ingrediente[]>([], Validators.required);



  async ngOnInit() {
    this.ingredientes = await this.bbddService.getIngredientes();

  }

  getCantidadesValues(): { [key: string]: string } {
    const valores: { [key: string]: string } = {};
    for (const ing of this.ingredientesSelec) {
      valores[ing.nombre] = this.cantidades[ing.nombre].value; // Usar .value para obtener el valor
    }
    return valores;
  }

  agregarIngrediente() {
    if (this.cuadroNombre.value != null && this.cuadroNombre.valid) {
      let nuevoIngrediente: Ingrediente = {
        nombre: this.cuadroNombre.value
      }
      for (const ing of this.ingredientes) {
        if (ing.nombre.toLowerCase() === this.cuadroNombre.value.toLowerCase()) {
          console.log(ing.nombre.toLowerCase());
          console.log(this.cuadroNombre.value.toLowerCase());
          this.ingredientesSelec.push(nuevoIngrediente);

          this.cantidades[nuevoIngrediente.nombre] = new FormControl('', Validators.required);
          this.listaIngredientes.setValue(this.ingredientesSelec);

          this.cuadroNombre.reset();
          return;
        }
      }


      this.cuadroNombre.reset();

      this.ingredientes.push(nuevoIngrediente);
      this.ingredientesSelec.push(nuevoIngrediente);

      // Crear un nuevo FormControl para la cantidad del nuevo ingrediente
      this.cantidades[nuevoIngrediente.nombre] = new FormControl('', Validators.required);

      // Actualizar el valor del mat-select para reflejar la selección
      this.listaIngredientes.setValue(this.ingredientesSelec);
      this.bbddService.insertaIngrediente(nuevoIngrediente);
      this.cantidades[nuevoIngrediente.nombre] = new FormControl('', Validators.required);
      this.notifService.muestraMensaje("Ingrediente añadido a la base de datos")
    } else {
      this.notifService.muestraMensaje("Por favor, escribe el nombre de un ingrediente nuevo");
      return;
    }

  }

  actualizarSeleccionIngredientes(event: any) {
    this.ingredientesSelec = event.value;

    // Limpiar el objeto de cantidades
    this.cantidades = {};

    // Crear un FormControl para cada ingrediente seleccionado
    this.ingredientesSelec.forEach(ing => {
      this.cantidades[ing.nombre] = new FormControl('', Validators.required);
    });

    console.log("Ingredientes seleccionados:", this.ingredientesSelec);
    console.log("Controles de cantidad:", this.cantidades);
  }

  incluirReceta() {
    if (this.ingredientesSelec.length === 0) {
      this.notifService.muestraMensaje("Por favor, selecciona al menos un ingrediente.");
      return;
    }

    // Verificar si todas las cantidades están llenas
    let cantidadValida = true;
    for (const ing of this.ingredientesSelec) {
      if (!this.cantidades[ing.nombre] || !this.cantidades[ing.nombre].value) {
        cantidadValida = false;
        if (this.cantidades[ing.nombre]) {
          this.cantidades[ing.nombre].markAsTouched(); // Marcar como tocado para mostrar el error
        }
      }
    }

    if (!cantidadValida) {
      this.notifService.muestraMensaje("Por favor, completa todas las cantidades de los ingredientes.");
      return;
    }

    if (this.cuadroplato.value != null && this.cuadropreparacion.value != null) {
      let nuevaReceta: Receta = {
        plato: this.cuadroplato.value,
        ingredientes: this.ingredientesSelec,
        cantidad: this.getCantidadesValues(), // Obtener los valores de las cantidades
        preparacion: this.cuadropreparacion.value
      };
      this.recetas.push(nuevaReceta);
      this.bbddService.insertaReceta(nuevaReceta);
      this.notifService.muestraMensaje("Se ha añadido la receta a la base de datos");
      /* this.router.navigate([""]); */
    }
  }


}
