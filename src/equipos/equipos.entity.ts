import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';

@Entity()
export class Equipo extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.equipo) //Relacion uno a muchos con la tabla equiporeceta con la columna equipoid
    @OneToMany(type => Usuarios, Usuarios => Usuarios.equipo)            //Relacion uno a muchos con la tabla Usuatios columna equipoid
    id: number;

    @Column()
    fecha: Date;

}
