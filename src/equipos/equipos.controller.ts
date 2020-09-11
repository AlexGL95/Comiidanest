import { Controller, Get, Put, Body, Req, HttpStatus } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { updateDateDto } from './dtos/updateDate.dto';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    //Aqui pega tus API

    //API getAll.
    @Get()
    getAll( @Req() response ) {
        return this.equiposService.getAll()
            .then( equiposArr => {
                response.status(HttpStatus.OK).json(equiposArr);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API updateDate.
    @Put()
    updateDate( @Req() response, @Body() newDate: updateDateDto ){
        return this.equiposService.updateDate(newDate)
            .then( receta => {
                response.status(HttpStatus.OK).json(receta);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

}
