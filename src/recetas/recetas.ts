import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EquipoReceta } from "src/equipo-receta/equipo-receta";


enum Categoria{
    Entrada="Entrada",
    Plato_fuerte="Plato Fuerte",
    Bebida="Bebida",
    Postre="postre",
    Acompañamiento="Acompañamiento"

}
@Entity()
export class Recetas {
    
    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.recetas)
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
