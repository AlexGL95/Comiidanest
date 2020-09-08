import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Equipo } from '../equipos/equipo.entity';
@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    pass:string;

    @Column()
    super:boolean;
    
    @ManyToOne(type => Equipo, Equipo=>Equipo.id)
    equipo:Equipo;

}
