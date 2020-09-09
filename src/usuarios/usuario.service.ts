import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariodto } from './dto/create-usuariodto';
import { Equipo } from '../equipos/equipo.entity';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>
    ){} 

    //Recuperar todos los usuarios
    
    async getAll():Promise<Usuarios[]> {
        return await this.userRepository.find({relations:["equipo"]});
    }

    //Recuperar usuario

    //crear nuevo usuario

    async createUser(newuser: CreateUsuariodto):Promise<Usuarios>{
        const nuevo = new Usuarios();
        const Users = await this.userRepository.findOne({ where: { nombre: `${newuser.nombre}` } });
        if (Users) {
            const err = new Error;
            err.name = "T-805";
            err.message = 'Usuario Duplicado';
            throw err;
        } else {
            nuevo.id=0;
            nuevo.nombre=newuser.nombre;
            nuevo.pass=newuser.pass;
            nuevo.equipo=newuser.equipoid;
            return this.userRepository.save(nuevo)
        }
       
    }

    //actualizar datos del usuario

    async updateUsuario(idUsuario:number, usuarioActualizar: CreateUsuariodto):Promise<Usuarios>{
        const usuarioupdate = await this.userRepository.findOne(idUsuario);
        const Users = await this.userRepository.findOne({ where: { nombre: `${usuarioActualizar.nombre}` } });
        if (Users) {
            const err = new Error;
            err.name = "T-805";
            err.message = 'Usuario Duplicado';
            throw err;
        } else {
            usuarioupdate.nombre=usuarioActualizar.nombre;
            usuarioupdate.pass=usuarioActualizar.pass;
            usuarioupdate.equipo=usuarioActualizar.equipoid;
            return await this.userRepository.save(usuarioupdate)
        }
        
    }

    //eliminar uduario mediante id

    async deleteusuario(idmensaje:number):Promise <any>{
        return await this.userRepository.delete(idmensaje);
    }


}
