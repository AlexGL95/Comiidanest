//Modules
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');
//Services
import { RondasService } from "../ronda/ronda.service";
import { EquiposService } from "../equipo/equipo.service";
import { ErrorService } from '../error/error.service';
//Entities
import { Usuarios } from './usuario.entity';
import { Rondas } from "../ronda/ronda.entity";
//Interfaces
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { EquiposInterface } from "../equipo/interface/equipos.interface";
import { Equipo } from '../equipo/equipo.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private userRepository: Repository<Usuarios>,
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
        private rondasService: RondasService,
        private equipoService: EquiposService,
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
                nuevo.token='';
                const bcrypt = require ("bcrypt");
                nuevo.salt = await bcrypt.genSalt();
                nuevo.pass = await bcrypt.hash(newuser.pass, nuevo.salt);
                return await this.userRepository.save(nuevo);
            }
            
        } catch (error) {
            throw error;
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

    //Actualizar solo nombre de usuario
    async updateUsername(idUsuario:number, usuarioActualizar: CreateUsuariodto):Promise<Usuarios>{
        const usuarioupdate = await this.userRepository.findOne(idUsuario);
        const Users = await this.userRepository.find({ where: { nombre: `${usuarioActualizar.nombre}` } });
        if (Users.length > 1) {//comprueba que no haya mas de 1 usuario con el mismo nombre
            this.sererr.throwError('T-805');
        } else {//actualiza datos del usuario
            usuarioupdate.nombre=usuarioActualizar.nombre;
            return await this.userRepository.save(usuarioupdate);
        }
    }

    //Actualizar solo contraseña de usuario
    async updatepass(idUsuario:number, usuarioActualizar: CreateUsuariodto):Promise<Usuarios>{
        const bcrypt = require ("bcrypt");
        const usuarioupdate = await this.userRepository.findOne(idUsuario);
        const Users = await this.userRepository.find({ where: { nombre: `${usuarioActualizar.nombre}` } });
        if (Users.length > 1) {//comprueba que no haya mas de 1 usuario con el mismo nombre
            this.sererr.throwError('T-805');
        } else {//actualiza datos del usuario
            usuarioupdate.nombre=usuarioActualizar.nombre;
            usuarioupdate.salt = await bcrypt.genSalt();
            usuarioupdate.pass = await bcrypt.hash(usuarioActualizar.newpass, usuarioupdate.salt);
            return await this.userRepository.save(usuarioupdate);
        }
    }

    //Metodo para encontrar un usuario por su Id.
    async getById( id: number ) {
        const user = await this.userRepository.findOne(id, { relations: ["equipo"] });
        if(user) {
            return user;
        } else {
            this.sererr.throwError("T-801"); 
        } 
    }

    //Metodo para obtener un usuario por su equipo
    async getOneByTeam( idEquipo: number ) {
        const usuario = await this.userRepository.findOne( { where:{ equipo: idEquipo }, relations: ["equipo"] } );
        if( usuario) {
            return usuario;
        } else {
            this.sererr.throwError("T-801");
        } 
    }

    //Metodo para eliminar usuario mediante su Id.
    async deleteUsuario( id: number ): Promise <any> {
        //1.-Obten las rondas en el sistema
        let rondas: Rondas[] = [];
            rondas = await this.rondasService.getRondas();

            if (rondas.length > 0 ) {
                //2.-Verifica si hay una ronda activa
                let rondaActiva: number = 0;
                rondas.forEach( ronda => {
                    if(ronda.activa === true) {
                        rondaActiva = ronda.id;
                    }
                });
                //3.-Si no (rondaActiva == 0) y la ronda no es la siguiente inmediata , elimina el usuario.
                let fechaActual = new Date();
                let inicioDeRonda = moment(rondas[0].fecha_inicio, 'MMM Do YY').subtract(1, 'day').toDate();
                if ( (rondaActiva === 0)  && (fechaActual < inicioDeRonda) ) {
                    return await this.userRepository.delete(id);
                }
        
                //4.-Si si, busca el usuario.
                else if ( (rondaActiva === 1) || (fechaActual >= inicioDeRonda) ) {
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
        
                    //6.-Si si pertenece, busca el id y fecha del ultimo equipo de la ronda.
                    else {
                        let idUltimo: number;
                        let fechaUltimo: string;
                        try {
                            let equiposArr: EquiposInterface[];
                            equiposArr = await this.equipoService.getAll();
                            let et = await this.equipoRepository.findOne({ where: {fecha: equiposArr[equiposArr.length-1].nombre } });
                            idUltimo = et.id;
                            fechaUltimo = equiposArr[equiposArr.length - 1].nombre;
                        } catch (err) {
                            throw err;
                        }
        
                        //7.-Obten la fecha del equipo al que pertenece el usuario que se quiere eliminar
                        let idUsuario: number = user.equipo.id;
                        let fechaUsuario: string = user.equipo.fecha;
        
                        //8.-Cambia las fechas de las rondas en las que se encuentran
                        console.log(idUsuario, fechaUsuario,' ultimo: ', idUltimo, fechaUltimo );
                        
                        try {
                                await this.equipoService.updateDate( { id: idUsuario, fechaNueva: fechaUltimo} );
                                await this.equipoService.updateDate( { id: idUltimo , fechaNueva: fechaUsuario} );
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
                            await this.updateUsuario(compañero.id, { nombre: compañero.nombre, pass: compañero.pass,token:compañero.token, super: compañero.super ,equipoid: null});
                        } catch (err) {
                            throw err;
                        }
        
                        //11.5.-Se elimina el equipo del usuario
                        try {
                            await this.equipoService.deleteTeamById(user.equipo.id);
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
            } else {
                this.userRepository.delete(id);
            }
        
    
    }

    //Validar contraseña
    async validatepass(authCredentials:CreateUsuariodto): Promise<Usuarios>{
        const {nombre,pass}=authCredentials;
        const usuario = await this.userRepository.findOne({nombre}, {relations: ["equipo"]} );
        if (usuario && await usuario.validatepass(pass)) {
            return await usuario;
        } else {
            return null;
        }
    }

}
