import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Error} from '../error/error.entity.entity'
import { Usuarios } from '../usuario/usuario.entity';

@Entity()
export class LogErrores {

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(string => Error)
    @JoinColumn()
    error_:Error;

    @OneToOne(int=> Usuarios)
    @JoinColumn()
    usuario_:Usuarios;
}
