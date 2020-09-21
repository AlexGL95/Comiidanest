import { Controller, Get, Post, Delete, Param, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { RondasService } from './ronda.service';
import { Rondas } from './ronda.entity';
import { response } from 'express';

@Controller('rondas')
export class RondasController {
    constructor(private rondasService: RondasService){}

    @Post()
    createRondas(@Res() response){
        return this.rondasService.createRondas().then(rondas => {
            response.status(HttpStatus.CREATED).json(rondas)
        }).catch(()=>{
            response.status(HttpStatus.CONFLICT).json({usuariom:"Error en la creacion de la ronda"});})
    }

    @Get()
    getRondas(): Promise<Rondas[]>{
        return this.rondasService.getRondas();
    }

    @Delete('/:id')
    deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<Rondas[]> {
        return this.rondasService.deleteRondas(id);
    }

    @Get('/test')
    testi(): Promise<Rondas>{
        return this.rondasService.recrondas();
    }

    @Get('/activa')
    temporalRondas(): Promise<Rondas[]>{
        return this.rondasService.temporalRondas();
    }

}
