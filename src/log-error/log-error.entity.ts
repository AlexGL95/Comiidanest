import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Usuarios } from '../usuario/usuario.entity';
import { Err } from "../error/error.entity";

@Entity()
export class LogErrores {

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(string => Err)
    @JoinColumn()
    error_:Err;

    @OneToOne(int=> Usuarios)
    @JoinColumn()
    usuario_:Usuarios;
}
