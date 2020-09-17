import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Error} from '../error/error.entity'
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
