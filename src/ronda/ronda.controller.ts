//Modules
import { Controller, Get, Post, Delete, Param, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
//Services
import { RondasService } from './ronda.service';
//Entities
import { Rondas } from './ronda.entity';
import { response } from 'express';

@Controller('rondas')
export class RondasController {
    constructor(private rondasService: RondasService){}

    @Get('/ronda')
    createRondas(@Res() response){
        return this.rondasService.createRondas().then(createRondas => {
            response.status(HttpStatus.CREATED).json(createRondas)
        }).catch(()=>{
            response.status(HttpStatus.CONFLICT).json({usuariom:"Error en la creacion de la ronda"});})
    }

    @Get()
    getRondas(@Res() response){
        return this.rondasService.getRondas().then(getRondas => {
            response.status(HttpStatus.OK).json(getRondas)
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion de rondas'});
        })
    }

    @Delete()
    deleteTeam(@Res() response){
        return this.rondasService.deleteRondas().then(deleteRondas => {
            response.status(HttpStatus.OK).json(deleteRondas)
        }).catch(err => {
            response.status(HttpStatus.CONFLICT).json(err)
        })
    }
    
    @Get('/activa')
    temporalRondas(): Promise<Rondas[]>{
        return this.rondasService.temporalRondas();
    }

    @Get('/test')
    testi(): Promise<Rondas>{
        return this.rondasService.recrondas();
    }

}
