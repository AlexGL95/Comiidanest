import { Controller, Get, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { RondasService } from './ronda.service';
import { Rondas } from './ronda.entity';

@Controller('rondas')
export class RondasController {
    constructor(private rondasService: RondasService){}

    @Post()
    createRondas(): Promise<Rondas[]>{
        return this.rondasService.createRondas();
    }

    @Get()
    getRondas(): Promise<Rondas[]>{
        return this.rondasService.getRondas();
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

    @Get('/eliminarEstaApi')
    eliminarEstaApi() {
        return this.rondasService.recalcularRondas();
    }

}
