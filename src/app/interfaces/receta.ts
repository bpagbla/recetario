import { Ingrediente } from "./ingrediente";

export interface Receta {
    id?: number;
    plato: string;
    ingredientes: Ingrediente[];
    cantidad: string[];
    preparacion: string;
}
