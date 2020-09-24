//Modules
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import * as bcrypt from 'bcrypt';
//Entities
import { Equipo } from '../equipo/equipo.entity';

@Entity()
export class Usuarios extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    pass:string;

    @Column()
    super:boolean;

    @Column()
    salt:string;

    @Column()
    token:string;
    
    @ManyToOne(type => Equipo, Equipo=>Equipo.id)
    equipo:Equipo;
    
    async validatepass(pass:string):Promise<boolean>{
        const hash =await bcrypt.hash(pass,this.salt);
        return await hash === this.pass;
    }
}
