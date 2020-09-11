import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariodto } from './dto/create-usuariodto';
import { Usuarios } from './usuarios.entity';
import { UsuariosRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuariosRepository)
        private userRep:UsuariosRepository,
        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>,
        
    ){
    } 
    
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
                const err = new Error;
                err.name = "T-805";
                err.message = 'Usuario Duplicado';
                throw err;
            } else {
                nuevo.id=0;
                nuevo.nombre=newuser.nombre;
                nuevo.equipo=newuser.equipoid;
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
