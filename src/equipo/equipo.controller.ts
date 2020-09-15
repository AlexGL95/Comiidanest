
import { Controller, Get, Put, Body, Res, HttpStatus, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EquiposService } from './equipo.service';
import { updateDateDto } from './dto/updateDate.dto';
import { Usuarios } from 'src/usuario/usuario.entity';
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
