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

    diaSiguiente(length: number, vectoMoment: Array<String>){
        let s = 0;
        for(let k = 0; k<length; k++){
            let d1 = moment().add(k+1+s, 'days').weekday();
            if(d1===6){
                s = s+2;
            }
            let d4 = moment().add(k+1+s, 'days');
            vectoMoment[k] = d4.format('MMM Do YY');
        };
    }
    async createRondas(): Promise<Rondas[]>{
        const foundEquipo = await this.equipoRepository.find();
        const foundRondas = await this.rondasRepository.find();
        const length = foundEquipo.length;
        const rondas = new Rondas();
        let s = 0;
        let rondasDate = '';
        let vectoMoment = [];
        
        let dateFinal = moment(rondasDate, 'MMM Do YY').toDate();
        let dateActual = moment().add(0, 'days').toDate();

        if (!foundRondas[0] || dateFinal < dateActual){
            this.diaSiguiente(length, vectoMoment);
        } else{
            for(let k = 0; k<foundEquipo.length; k++){
                let d1 = moment(foundRondas[foundRondas.length -1].fecha_final,'MMM Do YY').add(k+1+s, 'days').weekday();
                if(d1===6){
                    s = s+2;
                }
                let d4 = moment(foundRondas[foundRondas.length -1].fecha_final, 'MMM Do YY').add(k+1+s, 'days');
                vectoMoment[k] = d4.format('MMM Do YY');
            };

        }

        rondas.fecha_inicio = vectoMoment[0];
        rondas.fecha_final = vectoMoment[vectoMoment.length-1];
        rondas.activa = false;
        
        await this.rondasRepository.save(rondas);
        console.log(rondas.activa);

        if(vectoMoment[0]<vectoMoment[1]){
            console.log("Menor")
        };
        console.log(vectoMoment);
            
        const foundRondasActual = await this.rondasRepository.find();
        rondasDate = foundRondasActual[foundRondasActual.length-1].fecha_final;
        console.log(rondasDate);

        return foundRondasActual;
    }

    async temporalRondas(): Promise<Rondas[]>{
        const foundEquipo = await this.equipoRepository.find();
        const foundRondas = await this.rondasRepository.find();
        const rondas = new Rondas();
        const array = [];
        let g = 0;

        for(let j = 0; j<foundRondas.length; j++){
            g=0;
            for(let i = 0; i<foundEquipo.length; i++){
                let d1 = moment().add(3, 'days').format('MMM Do YY');
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
                console.log(d2)
            }
            foundRondas[j].activa = rondas.activa;
            
            await this.rondasRepository.save(foundRondas[j]);
        }
        const foundRondasActual = await this.rondasRepository.find();
        return foundRondasActual;
    }

    async getRondas(): Promise<Rondas[]>{
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

        //Recortador de ronda activa
        
        async recrondas():Promise<Rondas>{
            let ronda = await this.rondasRepository.findOne({ where: { activa: `1` } });
            let rondaActual = moment().add(3, 'days').toDate();
            let rondaFinal = moment(ronda.fecha_final, 'MMM Do YY').toDate();

            if (ronda) {
                if (rondaActual < rondaFinal) {
                    if ((rondaFinal.getDate()-1)!==0){
                        rondaFinal.setDate(rondaFinal.getDate()-1);
                    } else{
                        rondaFinal.setDate(rondaFinal.getDate()-3);
                    }
                    ronda.fecha_final = moment(rondaFinal).format('MMM Do YY');
                    console.log('Fecha inicio '+ronda.fecha_inicio);
                    console.log('Fecha final '+ronda.fecha_final);
                    return await this.rondasRepository.save(ronda);
                } else {
                    console.log('Es hoy');
                    return null;     
                }
            } else {
                console.log('No hay rondas activas');
                return null;
            }
        }
    
}
