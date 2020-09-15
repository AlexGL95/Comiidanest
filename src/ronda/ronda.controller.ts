import { Controller, Get, Post } from '@nestjs/common';
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
}
