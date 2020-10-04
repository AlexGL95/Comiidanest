import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Condimento {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;
    
}
