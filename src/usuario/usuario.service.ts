import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { Usuarios } from './usuario.entity';
import { ErrorService } from '../error/error.service';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private userRepository: Repository<Usuarios>,
        private sererr: ErrorService, //Servicio de errores 
    ){} 

    //Recuperar todos los usuarios
    
    async getAll():Promise<Usuarios[]> {
        return await this.userRepository.find({relations:["equipo"]});
    }
    
    //crear nuevo usuario
    
    async createUser(newuser: CreateUsuariodto):Promise<Usuarios>{
        try {
            const nuevo = new Usuarios();
            const Users = await this.userRepository.findOne({ where: { nombre: `${newuser.nombre}` } });
            //se puede configurar la columna como unique y atrapar el error de base de datos para evitar consulta doble
            if (Users) {
                this.sererr.throwError('T-805');
            } else {
                nuevo.id=0;
                nuevo.nombre=newuser.nombre;
                nuevo.equipo=null;
                nuevo.super = false;
                const bcrypt = require ("bcrypt");
                nuevo.salt = await bcrypt.genSalt();
                nuevo.pass = await bcrypt.hash(newuser.pass, nuevo.salt);
                return await this.userRepository.save(nuevo);
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    
    //actualizar datos del usuario

    async updateUsuario(idUsuario:number, usuarioActualizar: CreateUsuariodto):Promise<Usuarios>{
        const usuarioupdate = await this.userRepository.findOne(idUsuario);
        const Users = await this.userRepository.find({ where: { nombre: `${usuarioActualizar.nombre}` } });
        if (Users.length > 1) {//comprueba que no haya mas de 1 usuario con el mismo nombre
            this.sererr.throwError('T-805');
        } else {//actualiza datos del usuario
            usuarioupdate.nombre=usuarioActualizar.nombre;
            usuarioupdate.equipo=usuarioActualizar.equipoid;
            const bcrypt = require ("bcrypt");
            usuarioupdate.salt = await bcrypt.genSalt();
            usuarioupdate.pass = await bcrypt.hash(usuarioActualizar.pass, usuarioupdate.salt);
            return await this.userRepository.save(usuarioupdate)
        }
    }

    //Metodo para eliminar usuario mediante su Id.
    async deleteUsuario( id: number ): Promise <any> {
        return await this.userRepository.delete(id)
    }
    
    //Validar contraseña
    async validatepass(authCredentials:CreateUsuariodto): Promise<string>{
        const {nombre,pass}=authCredentials;
        const usuario = await this.userRepository.findOne({nombre});
        if (usuario && await usuario.validatepass(pass)) {
            console.log(usuario.nombre);
            return await usuario.nombre;
        } else {
            return null;
        }
    }

}
