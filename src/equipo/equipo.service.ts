import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from './equipo.entity';
import { Repository } from 'typeorm';
import { EquiposInterface } from './interface/equipos.interface';
import { Usuarios } from 'src/usuario/usuario.entity';
import moment = require('moment');
import { updateDateDto } from './dto/updateDate.dto';

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

    //Aqui pega tus apis con la entidad Equipo
    async getTeams(): Promise<Usuarios[]> {
        const found = await this.usuariosRepository.find({relations:["equipo"]});
        const foundTeam = await this.equiposRepository.find();
        const arreglo = [];
        const teams = new Equipo();
        const emptyteams = new Equipo();
        let s = 0;
        let vecto: Usuarios[]=[];
        let vecto2: Equipo[]=[];
        let date = new Date();

        const array = found;
        

        arreglo[0] = Math.random() * array.length;

        for (let i = 0; i < array.length; i++) {
            arreglo[i] = Math.round(Math.random() * (array.length - 1));
            for (let j = 0; j < i; j++) {
                if (arreglo[i] === arreglo[j]) {
                    i--;
                }
            }
        }

        for (let k = 0; k < (Math.floor(array.length/2)); k++) {
                let d1 = moment(foundTeam[foundTeam.length-1].fecha).add(k+1+s, 'days').weekday();
                if(d1===6){
                    s = s+2;
                }
                let d4 = moment(foundTeam[foundTeam.length-1].fecha).add(k+1+s, 'days').toDate();
                
                
                
                if (foundTeam[k]) {
                    const teamUpdate = await this.equiposRepository.findOne(foundTeam[k].id);
                    teams.fecha = d4;
                    //vecto2[k]=teamUpdate;
                    await this.equiposRepository.update(foundTeam[k], teams);
                } else {
                    teams.fecha = d4;
                    await this.equiposRepository.save(teams);
                }
                for (let f = k*2; f < (k*2)+2; f++) {
                    const foundTeamActual = await this.equiposRepository.find()
                    const userUpdate = await this.usuariosRepository.findOne(array[arreglo[f]].id, {relations:["equipo"]});
                    userUpdate.equipo = foundTeamActual[k];
                    vecto[f] = userUpdate;
                }
                console.log(array.length);
        }

        if((array.length%2)!==0){
            const userUpdate2 = await this.usuariosRepository.findOne(array[arreglo[found.length-1]].id, {relations:["equipo"]});
            userUpdate2.equipo = null;
            vecto[found.length-1] = userUpdate2;
        }
        
        console.log(vecto);
        console.log(arreglo);
        
        return await this.usuariosRepository.save(vecto);
    }

    async deleteTeam(id: number): Promise<Equipo[]> {
        const result = await this.equiposRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        const foundTeam = await this.equiposRepository.find();
        return foundTeam;
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
                let fechaEquipo = new Date(equipo.fecha);
                if( (fechaEquipo.getMonth() <= fechaComparacion.getMonth()) && (fechaEquipo.getDate() > fechaComparacion.getDate()) ) {
                    nEquipos += 1;
                }
            } );

            //6.-Crea array de objetos json por cada equipo que cumpla lo anterior
            let equiposArr: EquiposInterface[] = [];
            for (let m = 0; m < nEquipos; m++) {

                //7.-Consulta la fecha del equipo
                let fecha: Date = new Date(equiposTemp[m].fecha);

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
