//Modulos
import { Controller, Get, Put, Res, HttpStatus, Delete, Body } from '@nestjs/common';
//Services
import { EquiposService } from './equipo.service';
//Entitys
import { Equipo } from './equipo.entity';
//Interfaces
import { updateDateDto } from "./dto/updateDate.dto";

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

    //API updateDate (NOTA: Para un buen funcionamiento siempre envia las fechas mas de id mayor primero)
    @Put()
    updateDate( @Body() datesObject: updateDateDto, @Res() response ) {
        return this.equiposService.updateDate(datesObject)
            .then( () => {
                response.status(HttpStatus.OK).json( {Mensaje: `Fecha cambiada del ${datesObject.fechaVieja} al ${datesObject.fechaNueva}`} );
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

}
