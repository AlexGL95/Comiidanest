import { Entity, Generated, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';
import { type } from "os";
@Entity()
export class Equipo extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.equipo)
    @OneToMany(type => Usuarios, Usuarios => Usuarios.equipo)
    id:number;

    @Column()
    fecha:string;

}
