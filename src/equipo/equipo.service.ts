import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from './equipo.entity';
import { Repository } from 'typeorm';
import { EquiposInterface } from './interface/equipos.interface';
import { Usuarios } from 'src/usuario/usuario.entity';
import moment = require('moment');
import { updateDateDto } from './dto/updateDate.dto';
import { EquipoU } from './dto/equipos.dto';
import { ErrorService } from 'src/error/error.service';

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,
        @InjectRepository(EquipoReceta)
        private equipos_recetasRepository: Repository<EquipoReceta>,
        private errorService: ErrorService
    ) {}

    //Aqui pega tus apis con la entidad Equipo
    async getTeams(): Promise<Usuarios[]> {
        // Obtener arreglos con informacion de las bases de datos -->
        const found = await this.usuariosRepository.find({relations:["equipo"]});
        const foundTeam = await this.equiposRepository.find();
        //<--
        // Arreglos para aleatorizacion -->
        const arreglo = [];
        const array = found;
        //<--
        // Variable para excluir fines de semana -->
        let s = 0;
        //<--
        // Constante que guarda un objeto con propiedad fecha -->
        const date = new EquipoU();
        //<--
        // Inicializacion de arreglo con un valor random -->
        arreglo[0] = Math.random() * array.length;
        //<--
        // Aleatorizacion de números -->
        for (let i = 0; i < array.length; i++) {
            // Guarda número aleatorios dependiendo del tamaño del arreglo de usuarios -->
            arreglo[i] = Math.round(Math.random() * (array.length - 1));
            //<--
            // Verificacion para que ningun numero se repita -->
            for (let j = 0; j < i; j++) {
                if (arreglo[i] === arreglo[j]) {
                    i--;
                }
            }
            //<--
        }
        //<--
        // Genera Equipos y los asigna a los usuarios -->
        for (let k = 0; k < (Math.floor(array.length/2)); k++) {
            // Verifica si el día siguiente es fin de semana, de ser así suma 2 días para llegar al Lunes -->
            let d1 = moment().add(k+1+s, 'days').weekday();
            if(d1===6){
                s = s+2;
            }
            //<--
            // Guarda la fecha en fomato MMM Do YY que devuelve un string-->
            let d4 = moment().add(k+1+s, 'days').format('MMM Do YY');
            //<--
            // Verifica Si el arreglo de equipos en una posicion determinada tiene un dato -->
            // Si tiene dato lo actualiza con la nueva fecha -->
            if (foundTeam[k]) {
                const teamUpdate = await this.equiposRepository.findOne(foundTeam[k].id);
                date.fecha = d4;
                await this.equiposRepository.update(teamUpdate, date);
            };
            //<--
            // Si no lo tiene lo crea y guarda en la base de datos -->
            if(!foundTeam[k]) {
                let date2: EquipoU = {fecha: d4};
                await this.equiposRepository.save(date2);
            }
            //<--
            //<--
            // Llama a los datos actualizados de la base de datos de equipos -->
            const foundTeamActual = await this.equiposRepository.find()
            //<--
            
            for (let f = k*2; f < (k*2)+2; f++) {
                const userUpdate = await this.usuariosRepository.findOne(array[arreglo[f]].id, {relations:["equipo"]});
                userUpdate.equipo = foundTeamActual[k];
                await this.usuariosRepository.update(userUpdate.id, userUpdate);
                
            }
            
        }
        //<--

        if((array.length%2)!==0){
            const userUpdate2 = await this.usuariosRepository.findOne(array[arreglo[found.length-1]].id, {relations:["equipo"]});
            userUpdate2.equipo = null;
            await this.usuariosRepository.update(userUpdate2.id, userUpdate2);
        }
        
        const found2 = await this.usuariosRepository.find({relations:["equipo"]});
        
        return found2;
    }
        

    //eliminar equipo
    async deleteTeam(): Promise<Equipo> {
        const result = await this.equiposRepository.find();
        console.log(result);
        if (result) {
            let eaux =result[result.length-1];            //variable auxiliar para retornar el equipo eliminado y encontrar el ultimo equipo de la tabla
            this.equiposRepository.delete(eaux.id);    //elimina el equipo con el id
            return eaux;  
        }else{
            throw new NotFoundException(`No hay equipos en la base`);
        }
    }

    //crear equipo
    async addteam():Promise<Equipo>{
        let base = new Equipo;
        base.fecha =  moment('Sep 22nd 01', 'MMM Do YY').format('MMM Do YY');
        console.log(base);
       return await this.equiposRepository.save(base);
    }

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
                let fechaEquipo = moment(equipo.fecha, 'MMM Do YY').toDate();
                if( (fechaEquipo.getMonth() <= fechaComparacion.getMonth()) && (fechaEquipo.getDate() > fechaComparacion.getDate()) ) {
                    nEquipos += 1;
                }
            } );

            //6.-Crea array de objetos json por cada equipo que cumpla lo anterior
            let equiposArr: EquiposInterface[] = [];
            for (let m = 0; m < nEquipos; m++) {

                //7.-Consulta la fecha del equipo
                let fecha = moment(equiposTemp[m].fecha, 'MMM Do YY');

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
                    nombre: fecha.format('MMM Do YY'),
                    integrantes_nombres: integrantesArr,
                    recetas_nombres: recetasArr
                };
                equiposArr.push(temp);
            }

            //13.-Retorna el equipo
            return equiposArr;

        } else {
            this.errorService.throwError("T-804");
        }
    }

    //Metodo que actualiza la fecha del equipo
    async updateDate( update: updateDateDto ){
        const equipo = await this.equiposRepository.findOne( { where:{ fecha: update.fechaVieja } } );
        //Si la encuentra, la actualiza, si no, retorna un error.
        if (equipo) {
            equipo.fecha = update.fechaNueva;
            return await this.equiposRepository.update(equipo.id, equipo);
        } else {
            this.errorService.throwError("T-803");
        }
    }
}
