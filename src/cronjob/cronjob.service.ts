import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
    run10seconds(){
        console.log('holis');
        this.rondaser.temporalRondas();
        this.erroservice.llenado();
    }

}
