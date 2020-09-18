import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RondasService } from '../ronda/ronda.service';

@Injectable()
export class CronjobService {
    constructor(
     private rondaser:RondasService,
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    run10seconds(){
        console.log('holis');
        this.rondaser.temporalRondas();
    }
}
