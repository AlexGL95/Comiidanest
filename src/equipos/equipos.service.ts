import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipo.entity';
import { Repository } from 'typeorm';
import { Equipos } from './interfaces/equipos.interface';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import moment = require('moment');

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,
    ) {}

    //Aqui pega tus apis con la entidad Equipo
    async getTeams(): Promise<Usuarios[]> {

        // Declaracion de variables
        const found = await this.usuariosRepository.find({relations:["equipo"]});
        const foundTeam = await this.equiposRepository.find();
        const arreglo = [];
        const length = foundTeam.length;
        const teams = new Equipo();
        let s = 0;
        let u = 0;
        let vecto: Usuarios[]=[];

        const array = found;
        console.log(array.length);

        arreglo[0] = Math.random() * array.length;

        //Generacion de numeros aleatorios en un arreglo
        for (let i = 0; i < array.length; i++) {
            arreglo[i] = Math.round(Math.random() * (array.length - 1));
            for (let j = 0; j < i; j++) {
                if (arreglo[i] === arreglo[j]) {
                    i--;
                }
            }
        }

        //Poceso para genera equipos
        for (let k = 0; k < (Math.floor(array.length/2)); k++) {
            //Manejo de fechas
                let d1 = moment(foundTeam[length-1].fecha, 'MMM Do YY').add(k+1+s, 'days').weekday()
                if(d1===6){
                    s = s + 2;
                    u++;
                }
                console.log(d1)
                let d4 = moment(foundTeam[length-1].fecha, 'MMM Do YY').add(k+1+s, 'days').format('MMM Do YY');
                
                //Compara si ya existe un equipo en la localidad actual
                //Si existe, lo actualiza
                if (foundTeam[k]) {
                    const teamUpdate = await this.equiposRepository.findOne(foundTeam[k].id);
                    teamUpdate.fecha = d4;
                    await this.equiposRepository.update(foundTeam[k], teamUpdate);
                } 
                //Si no, crea uno
                else {
                    teams.fecha = d4;
                    await this.equiposRepository.save(teams);
                }
                //Asigna la id del equipo a dos usuarios
                for (let f = k*2; f < (k*2)+2; f++) {
                    const userUpdate = await this.usuariosRepository.findOne(array[arreglo[f]].id, {relations:["equipo"]});
                    userUpdate.equipo = foundTeam[k];
                    await this.usuariosRepository.save(userUpdate);
                    vecto[f] = userUpdate;
                }
                
        }
        //Retorna los usuarios con equipos ya asignados
        return vecto;
    }

    //Borrar equipos
    async deleteTeam(id: number): Promise<Equipo[]> {
        const result = await this.equiposRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        const foundTeam = await this.equiposRepository.find();
        return foundTeam;
    }

}
