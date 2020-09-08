import { Entity, Generated, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';
import { type } from "os";
@Entity()
export class Equipo {

    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.equipo)
    @OneToMany(type => Usuarios, Usuarios => Usuarios.equipo)
    id:number;

    @Column()
    fecha:Date;

}
