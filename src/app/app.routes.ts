import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecetasComponent } from './recetas/recetas.component';
import { FormularioComponent } from './formulario/formulario.component';
import { RecetaComponent } from './receta/receta.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    { path: 'receta/:id', component: RecetaComponent },
    { path: 'nueva-receta', component: FormularioComponent },
    { path: 'recetas', component: RecetasComponent },
];
