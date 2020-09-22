//Modulos
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Err {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    codigo: string;

    @Column('text')
    descripcion: string;
}
