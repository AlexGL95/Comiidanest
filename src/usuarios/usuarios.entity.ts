import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Unique } from "typeorm";
import { Equipo } from '../equipos/equipo.entity';
import * as bcrypt from 'bcrypt';

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
    
    @ManyToOne(type => Equipo, Equipo=>Equipo.id)
    equipo:Equipo;
    
    async validatepass(pass:string):Promise<boolean>{
        const hash =await bcrypt.hash(pass,this.salt);
        console.log(hash);
        console.log(this.salt);
        return await hash === this.pass;
    }
}
