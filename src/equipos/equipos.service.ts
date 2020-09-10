import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Repository } from 'typeorm';
var moment = require('moment');

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
    ) {}

    //Aqui pega tus apis con la entidad Equipo
    async getAll() {
        //1.-Crea la fecha actual
        let fechaActual = new Date();
        console.log( fechaActual ); //BORRAR
        let fechaComparacion = new Date();
        fechaComparacion.setDate(fechaActual.getDate() - 1)
        console.log( fechaComparacion ); //BORRAR
        //2.-Llama todos los equipos
        let equiposArr = await this.equiposRepository.find();
        console.log( equiposArr ); //BORRAR
        //3.-Compara las fechas de los equipos con la actual y cuenta los equipos que cumplen esta condicion
        let nEquipos: number = 0;
        equiposArr.forEach( equipo => {
            if( equipo.fecha > fechaComparacion ) {
                nEquipos += 1;
            }
        } );
        console.log( nEquipos ); //BORRAR
        //4.-Crea un objeto json por cada equipo que cumpla lo anterior
        //5.-Añade la fecha fecha al objeto equipo.fecha
        //6.-Consulta en usuarios los usuarios con el id del equipo
        //7.-Añadelos a equipo.integrantes
        //8.-Consulta la tabla de equipo_receta y extrae los id que contengan en equipoId el equipo
        //9.-Añade desde la misma tabla recetasId a equipo.recetas
        //10.-Retorna el objeto
    }

}
