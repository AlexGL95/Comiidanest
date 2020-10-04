//Modulos
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Entitys
import { Err } from './error.entity';
//Interfaces
import { Createerrdto } from './dto/create_err.dto';

@Injectable()
export class ErrorService {

    constructor(
        @InjectRepository(Err)
        private errorRepository: Repository<Err>
    ) {}

    //Metodo para arrojar un objeto error por su codigo
    async throwError( codigo: string ) {
        let errTemp = await this.errorRepository.findOne( { where:{ codigo: codigo } } );
        let error: Error = {
            name: errTemp.codigo, message: errTemp.descripcion
        }
        throw error;
    }

    async llenado(){
        //variable para validar si la tabla esta vacia
        const errtable = await this.errorRepository.find()
        let err: Err [] = [
            {id:0,codigo:``,descripcion:"Usuario no encontrado"}, //T-801
            {id:0,codigo:``,descripcion:"Receta no encontrada"},
            {id:0,codigo:``,descripcion:"Equipo no encontrado"},
            {id:0,codigo:``,descripcion:"Ronda no encontrada"},
            {id:0,codigo:``,descripcion:"Usuario duplicado"},
            {id:0,codigo:``,descripcion:"Receta duplicada"}, //T-805
            {id:0,codigo:``,descripcion:"Equipo duplicado"},
            {id:0,codigo:``,descripcion:"Ronda duplicada"},
            {id:0,codigo:``,descripcion:"Tipo de dato inesperado"},
            {id:0,codigo:``,descripcion:"Excede longitud de caracteres"}, //T-809
            {id:0,codigo:``,descripcion:"No hay usuarios suficientes"},
            {id:0,codigo:``,descripcion:"Se elimino ronda activa"},
            {id:0,codigo:``,descripcion:"Parametros insuficientes"},
            {id:0,codigo:``,descripcion:"Base de datos no responde"},
            {id:0,codigo:``,descripcion:"No hay ingredientes"},
            {id:0,codigo:``,descripcion:"Codimento duplicado"},  //T-815
            {id:0,codigo:``,descripcion:"Condimento no encontrado"},] ; 
        //arreglo de strings para las descripciones delos errores
        if (errtable.length<=0 || errtable.length < err.length) {
            for (let i = 0; i < err.length; i++) {
                if ((i+1)>=10) {
                    err[i].codigo='T-8'+(i+1);
                }else{
                    err[i].codigo='T-80'+(i+1);
                }
                //asignacion de descripciones de codigos de error
                this.errorRepository.save(err[i]);//guardado de errores en BD 
            }
        }
        
    }
}
