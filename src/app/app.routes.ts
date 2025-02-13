import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecetasComponent } from './recetas/recetas.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    { path: 'receta/:id', component: RecetasComponent },
    { path: 'nueva-receta', component: FormularioComponent },
];
