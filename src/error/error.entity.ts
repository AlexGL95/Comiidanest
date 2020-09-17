import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Err {

    @PrimaryColumn()
    id:string;

    @Column()
    codigo: string;

    @Column('text')
    descripcion: string;
}
