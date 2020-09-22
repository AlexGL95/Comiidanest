//Modules
import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class Rondas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha_inicio: string;

    @Column()
    fecha_final: string;

    @Column()
    activa: boolean;

    @Generated()
    numero_ronda: number;

    @Column()
    hora_de_generacion: string;

}
