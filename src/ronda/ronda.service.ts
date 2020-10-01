//Modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');
//Entities
import { Equipo } from '../equipo/equipo.entity';
import { Rondas } from './ronda.entity';
import { Usuarios } from 'src/usuario/usuario.entity';
import { EquiposService } from 'src/equipo/equipo.service';

@Injectable()
export class RondasService {
    constructor(
        private equipoService: EquiposService,
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
        @InjectRepository(Rondas)
        private rondasRepository: Repository<Rondas>,
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>
    ){}

    //Metodo que guarda en un vector los dias de una ronda
    async diaSiguiente(length: number, vectoMoment: Array<String>){
        let s = 0;
        for(let k = 0; k<(Math.floor(length/2)); k++){
            let d1 = moment().add(k+1+s, 'days').weekday();
            if(d1===6){
                s = s+2;
            }
            let d4 = moment().add(k+1+s, 'days');
            vectoMoment[k] = d4.format('MMM Do YY');
        };
    }

    //Metodo para crear una ronda nueva
    async createRondas(): Promise<Rondas[]>{
        const usuariosArr: Usuarios[] = await this.usuariosRepository.find();
        const foundRondas: Rondas[] = await this.rondasRepository.find();
        const length = usuariosArr.length;
        const rondas = new Rondas();
        let s = 0; //Variable para control de fin de semana
        let rondasDate;
        let vectoMoment = []; //Guarda la fecha de inicio y final de la ronda

        //Condicion.
        //Si existe una ronda = llama el ultimo dato, si no, guarda hoy
        if (foundRondas.length > 0) {
            rondasDate = foundRondas[foundRondas.length-1].fecha_final;
        } else {
            rondasDate = '';
        }

        //Variables de comparacion, ultima fecha de la tabla y fecha actual
        let dateFinal = moment(rondasDate, 'MMM Do YY').toDate();
        let dateActual = moment().toDate();

        //Si no hay rondas guardas o solo hay rondas obsoletas = genera una ronda el dia siguidente
        if ( (foundRondas.length === 0) || (dateFinal < dateActual) ){
            //Hora de apertura de la ronda
            rondas.hora_de_generacion = dateActual.getHours().toString() ;
            //Verificacion de si la ronda tiene un fin de semana intrinseco
            await this.diaSiguiente(length, vectoMoment);
            //Se aleatoriza la ronda
            await this.equipoService.getTeams();
        //Si hay rondas futuras = Crea una ronda a partir de la siguiente fecha habil de la ultima ronda
        } else{
            //Hora de apertura de la ronda
            rondas.hora_de_generacion = "16";
            //Verificacion de si la ronda tiene un fin de semana intrinseco
            for(let k = 0; k<(Math.floor(usuariosArr.length/2)); k++){
                /*
                d1= Dia que se comprueba si es fin de semana
                d4= Lo mismo pero con otro formato
                */

                let d1 = moment(foundRondas[foundRondas.length-1].fecha_final,'MMM Do YY').add(k+1+s, 'days').weekday();
                //Condicional. Si el dia siguiente es sabado, incrementa el offset de finde en 2
                if(d1===6){
                    s = s+2;
                }
                let d4 = moment(foundRondas[foundRondas.length -1].fecha_final, 'MMM Do YY').add(k+1+s, 'days');
                vectoMoment[k] = d4.format('MMM Do YY');
            };
        }

        //Confuguracion de la nueva ronda
        rondas.fecha_inicio = vectoMoment[0];
        rondas.fecha_final = vectoMoment[vectoMoment.length-1];
        rondas.activa = false;
        await this.rondasRepository.save(rondas);
        
        //Objeto de comprobacion
        const foundRondasActual = await this.rondasRepository.find();
        return foundRondasActual;
    }

    async temporalRondas(): Promise<Rondas[]>{
        const usuariosArr: Usuarios[] = await this.usuariosRepository.find();
        // Constantes que almacenan la informacion de las bases de datos -->
        const foundRondas = await this.rondasRepository.find();
        const rondas = new Rondas();
        //<--
        // Variable para la obtencion de los días de la semana -->
        let g = 0;
        //<--

        for(let j = 0; j<foundRondas.length; j++){
            g=0;
            for(let i = 0; i<(Math.floor(usuariosArr.length/2)); i++){
                let d1 = moment().toDate();
                let d2 = moment(foundRondas[j].fecha_inicio, 'MMM Do YY').add(g, 'days').weekday();
                let d3 = moment(foundRondas[j].fecha_final, 'MMM Do YY').toDate();
                let d4 = moment(foundRondas[j].fecha_inicio, 'MMM Do YY').toDate();
                if (d2===6 || d2 === 0){
                    i--;
                };
                if((d1>=d4) && (d1<=d3)){
                    rondas.activa = true;
                    
                }else{
                    rondas.activa = false;
                }
                g++;
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

    async deleteRondas(): Promise<Rondas[]> {
        const foundRondas = await this.rondasRepository.find();
        const result = await this.rondasRepository.delete(foundRondas[foundRondas.length-1].id);
        const foundRondasActual= await this.rondasRepository.find();
        return foundRondasActual;
    }

        //Metodo recortador de ronda activa
        async recrondas():Promise<Rondas>{
            let ronda = await this.rondasRepository.findOne({ where: { activa: `1` } });
            let rondaActual = moment().toDate();
            let rondaFinal = moment(ronda.fecha_final, 'MMM Do YY').toDate();

            if (ronda) {
                if (rondaActual < rondaFinal) {
                    if ((rondaFinal.getDay()-1)!==0){
                        rondaFinal.setDate(rondaFinal.getDate()-1);
                    } else{
                        rondaFinal.setDate(rondaFinal.getDate()-3);
                    }
                    ronda.fecha_final = moment(rondaFinal).format('MMM Do YY');
                    return await this.rondasRepository.save(ronda);
                } else {
                    return null;     
                }
            } else {
                return null;
            }
        }
    
    //Metodo para recalcular todas las rondas futuras
    async recalcularRondas() {
        //1.-Obten las rondas existentes
        let rondas: Rondas[];
        try {
            rondas = await this.getRondas();
        } catch (err) {
            throw err;
        }

        //2.-Busca las rondas que su fecha de inicio sea mayor a la fecha actual
        let fechaActual = new Date();
        let rondasAEliminar: Rondas[] = []
        rondas.forEach( ronda => {
            let inicioDeRonda = moment(ronda.fecha_inicio, 'MMM Do YY').toDate();
            if( (inicioDeRonda >= fechaActual) ) {
                rondasAEliminar.push(ronda);
            }
        });

        //3.-Cuentalas
        const RONDAS_FUTURAS = rondasAEliminar.length;

        //4.-Borra las rondas que coincidan de la base de datos
        for (let m = 0; m < rondasAEliminar.length; m++) {
            await this.rondasRepository.delete(rondasAEliminar[m].id);
        }

        //5.-Crea el mismo numero de rondas
        for (let m = 0; m < rondasAEliminar.length; m++) {
            await this.createRondas();
        }
    }
}
