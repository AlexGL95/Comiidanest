import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';
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
        @InjectRepository(EquipoReceta)
        private equipos_recetasRepository: Repository<EquipoReceta>,
    ) {}

    //Aqui pega tus apis con la entidad Equipo
    async getTeams(): Promise<Usuarios[]> {
        const found = await this.usuariosRepository.find({relations:["equipo"]});
        const foundTeam = await this.equiposRepository.find();
        const arreglo = [];
        const teams = new Equipo();
        let s = 0;
        let vecto: Usuarios[]=[];

        const array = found;
        console.log(array.length);

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
                let d1 = moment().add(k+1, 'days').weekday()
                if(d1===6){
                    s = 2;
                }
                let d4 = moment().add(k+1+s, 'days').format('LLLL');
                
                if (foundTeam[k]) {
                    const teamUpdate = await this.equiposRepository.findOne(foundTeam[k].id);
                    teamUpdate.fecha = d4;
                    await this.equiposRepository.update(foundTeam[k], teamUpdate);
                } else {
                    teams.fecha = d4;
                    await this.equiposRepository.save(teams);
                }
                for (let f = k*2; f < (k*2)+2; f++) {
                    const userUpdate = await this.usuariosRepository.findOne(array[arreglo[f]].id, {relations:["equipo"]});
                    userUpdate.equipo = foundTeam[k];
                    await this.usuariosRepository.save(userUpdate);
                    vecto[f] = userUpdate;
                }
                
        }
        
        return vecto;
    }

    async deleteTeam(id: number): Promise<Equipo[]> {
        const result = await this.equiposRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        const foundTeam = await this.equiposRepository.find();
        return foundTeam;
    }

}
