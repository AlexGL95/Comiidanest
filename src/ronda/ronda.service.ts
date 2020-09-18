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

    async getRondas(): Promise<Rondas[]>{
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
                console.log(d2)
            }
            foundRondas[j].activa = rondas.activa;
            await this.rondasRepository.save(foundRondas[j]);
        }
        
        
        
        console.log(rondas.activa, array);
        return foundRondas;
    }

    async deleteRondas(id: number): Promise<Rondas[]> {
        const result = await this.rondasRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        const foundRondas= await this.rondasRepository.find();
        return foundRondas;
    }
/*
        //Recortador de ronda activa
        async recrondas():Promise<Rondas>{
            let ronda = await this.rondasRepository.findOne({ where: { activa: `1` } });
            if (ronda) {
                if (ronda.fecha_inicio.getDate() === (ronda.fecha_final.getDate()-1) ) {
                    ronda.fecha_final.setDate(ronda.fecha_final.getDate()-1);
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
    */

    //Activar Rondas
    async activateRondas(){
        const Rondas = await this.rondasRepository.find();
        let now = moment().parseZone().format('MMM Do YY');
        console.log(now);
        if (Rondas.length>0) {
            for (let i = 0; i < Rondas.length; i++) {
                const element = Rondas[i].fecha_inicio;
                console.log(element);
                if (element == now) {
                    console.log('Este si');
                    const activ = await this.rondasRepository.findOne({ where: { activa: `1` } });
                    if(activ){
                        console.log(activ);
                        activ.activa=false;
                        await this.rondasRepository.save(activ);
                    }
                    Rondas[i].activa=true;
                    await this.rondasRepository.save(Rondas[i]);
                } else {
                    console.log('Este no');
                }
            }
        } else {
            console.log('No hay rondas nada por hacer');
        }
    }

}
