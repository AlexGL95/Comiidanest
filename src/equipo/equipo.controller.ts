
import { Controller, Get, Put, Body, Res, HttpStatus, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EquiposService } from './equipo.service';
import { updateDateDto } from './dto/updateDate.dto';
import { Usuarios } from 'src/usuario/usuario.entity';
import { Equipo } from './equipo.entity';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    @Get('/random')
    getTeams(): Promise<Usuarios[]>{
        return this.equiposService.getTeams();
    }

    @Delete()
    deleteTeam(): Promise<Equipo> {
        return this.equiposService.deleteTeam();
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

}
