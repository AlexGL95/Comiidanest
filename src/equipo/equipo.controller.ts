//Modulos
import { Controller, Get, Res, HttpStatus, Delete } from '@nestjs/common';
//Services
import { EquiposService } from './equipo.service';
//Entitys
import { Equipo } from './equipo.entity';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}

    // API getTeams
    @Get('/random')
    getTeams(@Res() response){
        return this.equiposService.getTeams()
            .then( teams => {
                response.status(HttpStatus.OK).json(teams);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    // API deleteTeam
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
