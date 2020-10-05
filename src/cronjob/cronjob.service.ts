//Modulos
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
//Services
import { RondasService } from '../ronda/ronda.service';
import { ErrorService } from '../error/error.service';

@Injectable()
export class CronjobService {
    constructor(
     private rondaser:RondasService,
     private erroservice: ErrorService
    ){}

    //Ejecucion todos los dias a las 10AM
    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    run10am(){
        console.log('Se ejecuto');
        this.rondaser.temporalRondas(false);
        this.erroservice.llenado();
    }

    @Cron(CronExpression.EVERY_DAY_AT_4PM)
    run4pm(){
        console.log('Se ejecuto');
        this.rondaser.temporalRondas(true);
        this.rondaser.delRondaprime();
        this.erroservice.llenado();
    }

}
