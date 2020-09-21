import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { Usuarios } from './usuario.entity';
import { RondasService } from "../ronda/ronda.service";
import { Rondas } from "../ronda/ronda.entity";
import { EquiposService } from "../equipo/equipo.service";
import { EquiposInterface } from "../equipo/interface/equipos.interface";
import moment = require('moment');

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private userRepository: Repository<Usuarios>,
        private rondasService: RondasService,
        private equipoService: EquiposService
    ) {} 

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
        if (Users.length > 1) {
            const err = new Error;
            err.name = "T-805";
            err.message = 'Usuario Duplicado';
            throw err;
        } else {
            usuarioupdate.nombre=usuarioActualizar.nombre;
            usuarioupdate.equipo=usuarioActualizar.equipoid;
            const bcrypt = require ("bcrypt");
            usuarioupdate.salt = await bcrypt.genSalt();
            usuarioupdate.pass = await bcrypt.hash(usuarioActualizar.pass, usuarioupdate.salt);
            return await this.userRepository.save(usuarioupdate)
        }
    }

    //Metodo para encontrar un usuario por su Id.
    async getById( id: number ) {
        const user = await this.userRepository.findOne(id, { relations: ["equipo"] });
        if(user) {
            return user;
        } else {
            const err = new Error;
            err.name = "T-801";
            err.message = 'Usuario no encontrado';
            throw err;
        } 
    }

    async getOneByTeam( idEquipo: number ) {
        const usuario = await this.userRepository.findOne( { where:{ equipo: idEquipo }, relations: ["equipo"] } );
        if( usuario) {
            return usuario;
        } else {
            const err = new Error;
            err.name = "T-801";
            err.message = 'Usuario no encontrado';
            throw err;
        } 
    }

    //Metodo para eliminar usuario mediante su Id.
    async deleteUsuario( id: number ): Promise <any> {
        //1.-Obten las rondas en el sistema
        let rondas: Rondas[] = [];
        try {
            rondas = await this.rondasService.getRondas();
        } catch (err) {
            throw err;
        }

        //2.-Verifica si hay una ronda activa
        let rondaActiva: number = 0;
        rondas.forEach( ronda => {
            if(ronda.activa === true) {
                rondaActiva = ronda.id;
            }
        });

        //3.-Si no (rondaActiva == 0) , elimina el usuario.
        if (rondaActiva === 0) {
            return await this.userRepository.delete(id);
        }

        //4.-Si si, busca el usuario.
        else {
            let user: Usuarios;
            try {
                user = await this.getById(id);    
            } catch (err) {
                throw err;
            }

            //5.-Si no pertenece a un equipo actualmente (equipo == null) , elimina el usuario.
            if(user.equipo === null) {
                return await this.userRepository.delete(id);
            }

            //6.-Si si pertenece, busca la fecha del ultimo equipo de la ronda.
            else {
                let fechaFinal: string;
                try {
                    let equiposArr: EquiposInterface[];
                    equiposArr = await this.equipoService.getAll();
                    fechaFinal = equiposArr[equiposArr.length - 1].nombre;
                } catch (err) {
                    throw err;
                }

                //7.-Obten la fecha del equipo al que pertenece el usuario que se quiere eliminar
                let fechaEquipo: string = user.equipo.fecha;

                //8.-Cambia las fechas de las rondas en las que se encuentran
                try {
                    await this.equipoService.updateDate( { fechaVieja: fechaFinal, fechaNueva: fechaEquipo} );
                } catch (err) {
                    throw err;
                }
                try {
                    await this.equipoService.updateDate( { fechaVieja: fechaEquipo, fechaNueva: fechaFinal} );    
                } catch (err) {
                    throw err;
                }

                //9.-Se elimina el usuario que se desea eliminar
                this.userRepository.delete(id);

                //10.-Encuentra el compañero de equipo del usuario que se quiere eliminar
                let compañero: Usuarios;
                try {
                    compañero = await this.getOneByTeam(user.equipo.id);
                } catch (err) {
                    throw err;
                }

                //11.-Se modifica el equipo del compañero a null
                try {
                    await this.updateUsuario(compañero.id, { nombre: compañero.nombre, pass: compañero.pass, equipoid: null});
                } catch (err) {
                    throw err;
                }

                //12.-Llama la funcion recortar ronda.
                try {
                    await this.rondasService.recrondas();
                } catch (err) {
                    throw err;
                }

                //13.-Llama recalcularRondas.
                try {
                    await this.rondasService.recalcularRondas();
                } catch (err) {
                    throw err;
                }

            }
        }
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
