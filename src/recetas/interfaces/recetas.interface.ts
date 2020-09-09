import { Categoria } from '../recetas.entity';

export interface Receta {
    nombre: string;
    ingredientes: string;
    activo: boolean;
    categoria: Categoria;
  }