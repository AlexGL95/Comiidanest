import { Injectable } from '@nestjs/common';
import { Err } from "./error.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        if (errtable.length<=0) {
            let err: Createerrdto [] = [
                {codigo:``,descripcion:"Usuario no encontrado"},
                {codigo:``,descripcion:"Receta no encontrada"},
                {codigo:``,descripcion:"Equipo no encontrado"},
                {codigo:``,descripcion:"Ronda no encontrada"},
                {codigo:``,descripcion:"Usuario duplicado"},
                {codigo:``,descripcion:"Receta duplicada"},
                {codigo:``,descripcion:"Equipo duplicado"},
                {codigo:``,descripcion:"Ronda duplicada"},
                {codigo:``,descripcion:"Tipo de dato inesperado"},
                {codigo:``,descripcion:"Excede longitud de caracteres"},
                {codigo:``,descripcion:"No hay usuarios suficientes"},
                {codigo:``,descripcion:"Se elimino ronda activa"},
                {codigo:``,descripcion:"Parametros insuficientes"},
                {codigo:``,descripcion:"Base de datos no responde"},
                {codigo:``,descripcion:"No hay ingredientes"},] ; //objeto de tipo error para poblar la tabla
            //arreglo de strings para las descripciones delos errores
            
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
