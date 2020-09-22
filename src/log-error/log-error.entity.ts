//Modules
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
//Entities
import { Usuarios } from '../usuario/usuario.entity';

@Entity()
export class LogErrores {

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(int=> Usuarios)
    @JoinColumn()
    usuario_:Usuarios;
}
