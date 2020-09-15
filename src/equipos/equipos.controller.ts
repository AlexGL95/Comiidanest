
import { Controller, Get, Put, Body, Res, HttpStatus, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { updateDateDto } from './dtos/updateDate.dto';
import { response } from 'express';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Equipo } from './equipo.entity';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    @Get()
    getTeams(): Promise<Usuarios[]>{
        return this.equiposService.getTeams();
    }

    @Delete('/:id')
    deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<Equipo[]> {
        return this.equiposService.deleteTeam(id);
    }

    //API getAll.    
    @Get()
    getAll( @Res() response ) {
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
    updateDate( @Res() response, @Body() newDate: updateDateDto ){
        return this.equiposService.updateDate(newDate)
            .then( receta => {
                response.status(HttpStatus.OK).json(receta);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

}
