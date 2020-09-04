import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Error {

    @PrimaryColumn()
    id:string;

    @Column('text')
    descripcion: string;
}
