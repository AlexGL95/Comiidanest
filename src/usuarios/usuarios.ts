import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Equipo } from '../equipos/equipo';

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
    
    @ManyToOne(int => Equipo, Equipo=>Equipo.id)
    equipo:number;
}
