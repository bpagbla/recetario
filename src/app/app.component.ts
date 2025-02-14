import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./nav/nav.component";

import { HomeComponent } from './home/home.component';
import { RecetasComponent } from './recetas/recetas.component';
import { FormularioComponent } from './formulario/formulario.component';

import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recetario';
}
