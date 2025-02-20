
import { Ingrediente } from "./ingrediente";

export interface Receta {
    id?: number;
    plato: string;
    ingredientes: Ingrediente[];
    cantidad: {
        [key: string]: string
    };
    preparacion: string;
}
