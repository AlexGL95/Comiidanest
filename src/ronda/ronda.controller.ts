//Modules
import { Controller, Get, Post, Delete, Param, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
//Services
import { RondasService } from './ronda.service';
//Entities
import { Rondas } from './ronda.entity';

@Controller('rondas')
export class RondasController {
    constructor(private rondasService: RondasService){}

    @Post()
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

    @Delete('/:id')
    deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<Rondas[]> {
        return this.rondasService.deleteRondas(id);
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
