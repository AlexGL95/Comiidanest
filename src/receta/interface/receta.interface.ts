//Entities
import { Categoria } from '../receta.entity';

export interface Receta {
    nombre: string;
    ingredientes: string;
    activo: boolean;
    categoria: Categoria;
  }