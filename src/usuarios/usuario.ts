import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    pass:string;

    @Column()
    super:boolean;
    
}
