import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Usuarios } from '../usuario/usuario.entity';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';

@Entity()
export class Equipo extends BaseEntity{

    @PrimaryGeneratedColumn()
    @OneToMany(type => EquipoReceta, EquipoReceta => EquipoReceta.equipo)
    @OneToMany(type => Usuarios, Usuarios => Usuarios.equipo)
    id:number;

    @Column()
    fecha: Date;

}
