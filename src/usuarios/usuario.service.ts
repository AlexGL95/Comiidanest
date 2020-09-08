import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './usuarios';
import { Repository } from 'typeorm';
import { CreateUsuariodto } from './dto/create-usuariodto';
import { Equipo } from '../equipos/equipo';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>
    ){} 

    async getAll():Promise<Usuarios[]> {
        return await this.userRepository.find({relations:["equipo"]});
    }

    async createUser(newuser: CreateUsuariodto):Promise<Usuarios>{
        const nuevo = new Usuarios();
        nuevo.id=0;
        nuevo.nombre=newuser.nombre;
        nuevo.pass=newuser.pass;
        nuevo.equipo=newuser.equipoid;

        return this.userRepository.save(nuevo)
    }

    async updateUsuario(idUsuario:number, usuarioActualizar: CreateUsuariodto):Promise<Usuarios>{
        const usuarioupdate = await this.userRepository.findOne(idUsuario);
        usuarioupdate.nombre=usuarioActualizar.nombre;
        usuarioupdate.pass=usuarioActualizar.pass;
        usuarioupdate.equipo=usuarioActualizar.equipoid;

        return await this.userRepository.save(usuarioupdate)
    }

    async deleteusuario(idmensaje:number):Promise <any>{
        return await this.userRepository.delete(idmensaje);
    }


}
