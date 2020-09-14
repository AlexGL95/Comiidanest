import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';
import { Repository } from 'typeorm';
import { EquiposInterface } from './interfaces/equipos.interface';
import { updateDateDto } from './dtos/updateDate.dto';

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,
        @InjectRepository(EquipoReceta)
        private equipos_recetasRepository: Repository<EquipoReceta>,
    ) {}

    //Metodo que retorna los objetos equipo de manera organizada
    async getAll() {//: Promise<EquiposInterface[]>  {

        //1.-Crea la fecha actual
        let fechaActual = new Date();

        //2.-Crea la fecha de comparacion
        let fechaComparacion = new Date();
        fechaComparacion.setDate(fechaActual.getDate() - 1)

        //3.-Llama todos los equipos
        let equiposTemp = await this.equiposRepository.find();

        //4.-Si hay equipos, continua, si no, envia un error
        if ( equiposTemp.length > 0 ) {
            
            //5.-Compara el dia y mes de cada equipos con la actual y cuenta los equipos que estan activos bajo esta condicion
            let nEquipos: number = 0;
            equiposTemp.forEach( equipo => {
                if( (equipo.fecha.getMonth() <= fechaComparacion.getMonth()) && (equipo.fecha.getDate() > fechaComparacion.getDate()) ) {
                    nEquipos += 1;
                }
            } );

            //6.-Crea array de objetos json por cada equipo que cumpla lo anterior
            let equiposArr: EquiposInterface[] = [];
            for (let m = 0; m < nEquipos; m++) {

                //7.-Consulta la fecha del equipo
                let fecha: Date = equiposTemp[m].fecha;

                //8.-Consulta en usuarios los usuarios con el id del equipo
                let usuariosEnEquipo = await this.usuariosRepository.find( { where: { equipo: `${m+1}` } } );

                //9.-Genera un arreglo con los integrantes del equipo
                let integrantesArr: string[] = [];
                for (let n = 0; n < usuariosEnEquipo.length; n++) {
                    integrantesArr.push( `${usuariosEnEquipo[n].nombre}` );
                }

                //10.-Consulta la tabla de equipo_receta y extrae las recetas que contengan en equipoId el equipo
                let recetasEnEquipo = await this.equipos_recetasRepository.find( { relations:["recetas"], where: { equipo: `${m+1}` } });

                //11.-Genera un arreglo con los nombres de las recetas asignadas a un equipo
                let recetasArr: string[] = [];
                for (let n = 0; n < recetasEnEquipo.length; n++) {
                    recetasArr.push( `${recetasEnEquipo[n].recetas.nombre}` );
                }
                
                //12.-Guarda el objeto en un arreglo de equipos a imprimir
                let temp: EquiposInterface = {
                    nombre: fecha,
                    integrantes_nombres: integrantesArr,
                    recetas_nombres: recetasArr
                };
                equiposArr.push(temp);
            }

            //13.-Retorna el equipo
            return equiposArr;

        } else {
            const err = new Error;
            err.name = "T-804";
            err.message = 'Ronda no encontrada.';
            throw err;
        }
    }

    //Metodo que actualiza la fecha del equipo
    async updateDate( nuevaFecha: updateDateDto ){
        const equipo = await this.equiposRepository.findOne(nuevaFecha.id);
        //Si la encuentra, la actualiza, si no, retorna un error.
        if (equipo) {
            equipo.fecha = nuevaFecha.fechaNueva;
            return await this.equiposRepository.update(equipo.id, equipo);
        } else {
            const err = new Error;
            err.name = "T-803";
            err.message = 'Equipo no encontrado.';
            throw err;
        }
    }
}
