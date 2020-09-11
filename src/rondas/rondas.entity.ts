import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class Rondas {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha_inicio:string;

    @Column()
    fecha_termino:string;

    @Column()
    activa:boolean;

    @Generated()
    numero_ronda;
}
