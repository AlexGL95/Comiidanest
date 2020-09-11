import { Controller, Get, Put, Body, Req } from '@nestjs/common';
import { EquiposService } from './equipos.service';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    //Aqui pega tus API

    //API getAll.
    @Get()
    getAll( @Req() response ) {
        return this.equiposService.getAll();
    }

    //API updateDate.
    @Put()
    updateDate( @Req() response, @Body() newDate: Date ){
        return "updateDate works!";
        //return "updateDate works!";
    }

}
