import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from '../equipo/equipo.entity';
import { Repository } from 'typeorm';
import moment = require('moment');
import { Rondas } from './ronda.entity';

@Injectable()
export class RondasService {
    constructor(
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
        @InjectRepository(Rondas)
        private rondasRepository: Repository<Rondas>
    ){}
    
    async createRondas(): Promise<Rondas[]>{
        const foundEquipo = await this.equipoRepository.find();
        const foundRondas = await this.rondasRepository.find();
        const length = foundEquipo.length;
        const rondas = new Rondas();
        let vectoDate = [];

        let s = 0;
        if(!foundRondas[0]){
            for(let k = 0; k<foundEquipo.length; k++){
                let d1 = moment().add(k+1+s, 'days').weekday();
                if(d1===6){
                    s = s+2;
                }
                let d4 = moment().add(k+1+s, 'days').toDate();
                vectoDate[k] = d4;
            }
            console.log(vectoDate);
            console.log()
        }
        
        
        //rondas.fecha_inicio = foundEquipo[0].fecha;
        //rondas.fecha_final = foundEquipo[length-1].fecha;
        //rondas.activa = false;
        
        //await this.rondasRepository.save(rondas);
        //console.log(rondas.activa);
        return foundRondas;
    }

    async temporalRondas(): Promise<Rondas[]>{
        const foundEquipo = await this.equipoRepository.find();
        const foundRondas = await this.rondasRepository.find();
        const length = foundEquipo.length;
        const length2 = foundRondas.length;
        const rondas = new Rondas();
        const array = [];
        let g = 0;
        let d1 = moment(foundEquipo[length-1].fecha, 'MMM Do YY').fromNow();
        

        //for(let i = 0; i<foundEquipo.length; i++){
          //  array[i] = foundEquipo[i].fecha
           // if(d2===array[i]){
             //   rondas.activa = true;
               // i = foundEquipo.length;
            //}else if(i<foundEquipo.length-1){
              //  rondas.activa = true;
            //}else{
              //  rondas.activa = false;
           // }
        //}

        for(let j = 0; j<foundRondas.length; j++){
            g=0;
            for(let i = 0; i<foundEquipo.length; i++){
                let d1 = moment().add(34, 'days').format('MMM Do YY');
                let d2 = moment(foundRondas[j].fecha_inicio, 'MMM Do YY').add(g, 'days').weekday();
                let d3 = moment(foundRondas[j].fecha_final, 'MMM Do YY').format('MMM Do YY');
                let d4 = moment(foundRondas[j].fecha_inicio, 'MMM Do YY').add(g, 'days').format('MMM Do YY');
                if (d2===6 || d2 === 0){
                    i--;
                };
                if(d4.indexOf(d1)===0){
                    if(d3.indexOf(d4)!==0){
                        rondas.activa = true;
                        i = foundEquipo.length;
                    }else{
                        rondas.activa = false;
                        i = foundEquipo.length;
                    }
                }else{
                    rondas.activa = false;
                }
                
                g++
            }
            foundRondas[j].activa = rondas.activa;
            await this.rondasRepository.save(foundRondas[j]);
        }
        return foundRondas;
    }

    async getRondas(): Promise<Rondas[]> {
        return await this.rondasRepository.find();
    }

    async deleteRondas(id: number): Promise<Rondas[]> {
        const result = await this.rondasRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        const foundRondas= await this.rondasRepository.find();
        return foundRondas;
    }

    async recalcularRondas() {
        //1.-Obten las rondas existentes
        let rondas: Rondas[];
        try {
            rondas = await this.getRondas();
        } catch (err) {
            throw err;
        }
        console.log(rondas);

        //2.-Busca las rondas que su fecha de inicio sea mayor a la fecha actual
        let fechaActual = new Date();
        let rondasAEliminar = []
        rondas.forEach( ronda => {
            let inicioDeRonda = moment(ronda.fecha_inicio, 'MMM Do YY').toDate();
            if( (inicioDeRonda.getMonth() >= fechaActual.getMonth()) && (inicioDeRonda.getDate() >= fechaActual.getDate()) ) {

            }
        });

        //3.-Cuentalas
        //4.-Borrala de la base de datos
        //5.-Crea el mismo numero de rondas

    }
}
