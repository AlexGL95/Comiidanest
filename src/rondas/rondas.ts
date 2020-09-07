import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class Rondas {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha_inicio:Date;

    @Column()
    fecha_termino:Date;

    @Column()
    activa:boolean;

    @Generated()
    numero_ronda;
}
