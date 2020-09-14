import { Controller, Get, Put, Body, Res, HttpStatus } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { updateDateDto } from './dtos/updateDate.dto';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    //Aqui pega tus API

    //API getAll.
    @Get()
    getAll( @Res() response ) {
        this.equiposService.getAll()
            .then( equiposArr => {
                response.status(HttpStatus.OK).json(equiposArr);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API updateDate.
    @Put()
    updateDate( @Res() response, @Body() newDate: updateDateDto ){
        this.equiposService.updateDate(newDate)
            .then( equipoModified => {
                response.status(HttpStatus.OK).json(equipoModified);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

}
