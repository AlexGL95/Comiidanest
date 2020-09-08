import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Error} from '../errores/error.entity.entity'
import { from } from "rxjs";
import { Usuarios } from '../usuarios/usuarios.entity';

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
