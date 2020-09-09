import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { EquipoReceta } from "src/equipo-receta/equipo-receta.entity";

export enum Categoria{
    Entrada="Entrada",
    Plato_fuerte="Plato Fuerte",
    Bebida="Bebida",
    Postre="Postre",
    Acompañamiento="Acompañamiento",
    Salsa="Salsa"
}
@Entity()
export class Recetas extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.recetas) //Relacion uno a muchos con la tabla Equipo receta columna Recetaid
    id:number;

    @Column()
    nombre:string;

    @Column()
    activo:boolean;

    @Column({
        type:"enum",
        enum:Categoria,
        default:Categoria.Entrada})
    categoria:Categoria;

    @Column()
    ingredientes:string;
}
