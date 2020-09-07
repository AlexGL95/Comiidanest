import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Equipo } from "src/equipos/equipo";
import { Recetas } from '../recetas/recetas';
import { type } from "os";

@Entity()
export class EquipoReceta {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Equipo, Equipo=>Equipo.id) //Realacion muchos a uno con la tabla equipo columna id
    equipo:number;

    @ManyToOne(type => Recetas, Recetas=>Recetas.id) //Realacion muchos a uno con la tabla Recetas columna id
    recetas:number;
}
