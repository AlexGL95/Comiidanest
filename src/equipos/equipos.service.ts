import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Repository } from 'typeorm';
import { Equipos } from './interfaces/equipos.interface';

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
    ) {}

    //BORRAR!!!!!
    //INSERTADO DE DATOS TEST
    async borrar() {
        let actual = new Date(9,9,20);
//        let fecha = { fecha: ( -= 1) }
//        await this.equiposRepository.save(fecha)
    }

    //Metodo para buscar todas las recetas.
    async getAll() {//: Promise<Equipos[]> {
        //Crea una fecha actual de comparacion.
        let fechaActual = new Date();
        //Cuenta los equipos que tengan fecha mayor o igual a la actual
        let equipos = await this.equiposRepository.find();
        console.log(equipos);
        //Arma un nuevo objeto equipo, por cada equipo que cumpla la condicion anterior
        
        //Jala las fechas de los equipos a equipo.nombre

        //Jala los usuarios que contengan los id_equipo que coincidan con las fechas

        //Jala las recetas que tengan ese id_equipo desde equipos_recetas

        //Retorna el arreglo
        //return await this.recetasRepository.find();
    }

}
