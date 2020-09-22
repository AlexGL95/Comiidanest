//Modulos
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
//Entitys
import { Equipo } from "../equipo/equipo.entity";
import { Recetas } from '../receta/receta.entity';

@Entity()
export class EquipoReceta {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Equipo, Equipo=>Equipo.id)//Realacion muchos a uno con la tabla equipo columna id
    equipo:Equipo;

    @ManyToOne(type => Recetas, Recetas=>Recetas.id)//Realacion muchos a uno con la tabla Recetas columna id
    recetas:Recetas;

}
