import { Controller, Get, Post } from '@nestjs/common';
import { EquiposService } from 'src/equipos/equipos.service';
import { Equipo } from 'src/equipos/equipo.entity';
import { RondasService } from './rondas.service';
import { Rondas } from './rondas.entity';

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
}
