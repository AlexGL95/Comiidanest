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
import { RecetasService } from '../receta/receta.service';
import { EquipoReceta } from 'src/equipo_receta/equipo_receta.entity';
import { Recetas } from 'src/receta/receta.entity';

@Injectable()
export class RondasService {
    constructor(
        private equipoService: EquiposService,
        private RecetaServ: RecetasService,
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
        @InjectRepository(Rondas)
        private rondasRepository: Repository<Rondas>,
        @InjectRepository(Usuarios)
        private usuariosRepository: Repository<Usuarios>,
        @InjectRepository(EquipoReceta)
        private equipoRecetasRepository: Repository<EquipoReceta>,
        @InjectRepository(Recetas)
        private recetasRepository: Repository<Recetas>
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
            rondas.hora_de_generacion = `${dateActual.getHours() + 1}` ;
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

    //  funcion para eliminar la primer ronda de la tabla 
    async delRondaprime(){
        const rondas: Rondas[] = await this.rondasRepository.find();
        const diaActual = new Date;
        let diaInicial = moment(rondas[0].fecha_inicio, 'MMM Do YY').toDate();
        if ((rondas.length > 0) && (!rondas[0].activa) && (diaActual > diaInicial)) {
            await this.rondasRepository.delete(rondas[0].id);
        }
    }

    //Metodo para activar una ronda en su tiempo
    async temporalRondas( sonLas4: boolean ): Promise<Rondas[]>{
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
                let d5 = moment(foundRondas[j].fecha_final, 'MMM Do YY').subtract(1, 'day').toDate();
                if (d2===6 || d2 === 0){
                    i--;
                };
                if ((d1>=d4) && (d1<=d3) && (!sonLas4)){
                    rondas.activa = true;
                    await this.RecetaServ.changeall();
                }
                else if ((d1>=d4) && (d1 <= d5) && (sonLas4)){
                    rondas.activa = true;
                    await this.RecetaServ.changeall();
                }
                else{
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

    //Metodo que elimina la ULTIMA ronda
    async deleteRondas(): Promise<Rondas[]> {
        //1.-Se obtienen las rondas
        const rondasArr = await this.rondasRepository.find();
        //2.-Se elimina la ultima ronda
        await this.rondasRepository.delete(rondasArr[rondasArr.length-1].id);
        //3.-Se desasignan los equipos a los usuarios
            //3.1.-Se obtienen los usuarios
            const usuariosArr = await this.usuariosRepository.find();
            //3.2.-Se modifican para eliminar su equipo.
            let usuarioTemp: Usuarios;
            for (let m = 0; m < usuariosArr.length; m++) {
                usuarioTemp = usuariosArr[m];
                usuarioTemp.equipo = null;
                await this.usuariosRepository.update(usuarioTemp.id, usuarioTemp);
            }
        //4.-Se eliminan las asignaciones de recetas
            //4.1.-Se obtienen las relaciones
            const relacionesArr = await this.equipoRecetasRepository.find();
            //4.2.-Se modifican para eliminar su equipo.
            for (let m = 0; m < relacionesArr.length; m++) {
                await this.equipoRecetasRepository.delete(relacionesArr[m].id);
            }
        //5.-Se eliminan los equipos
            //5.1.-Se obtienen los equipos
            const equiposArr = await this.equipoRepository.find();
            //5.2.-Se eliminan
            for (let m = 0; m < equiposArr.length; m++) {
                await this.equipoRepository.delete(equiposArr[m].id);
            }
        //6.-Se desactivan las recetas
            //6.1.-Se obtienen las recetas
            const recetasArr = await this.recetasRepository.find();
            //6.2.-Si una receta esta activa, la actualiza
            for (let m = 0; m < recetasArr.length; m++) {
                recetasArr[m].activo = false;
                await this.recetasRepository.update(recetasArr[m].id, recetasArr[m]);
            }
        //5.-Se retorna un objeto con las nuevas rondas
        return await this.rondasRepository.find();
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
