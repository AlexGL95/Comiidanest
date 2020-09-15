import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class Rondas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
<<<<<<< HEAD
    fecha_inicio:string;

    @Column()
    fecha_termino:string;
=======
    fecha_inicio: Date;

    @Column()
    activa: boolean;

    @Column()
    activa: boolean;

    @Generated()
    numero_ronda: number;
}
