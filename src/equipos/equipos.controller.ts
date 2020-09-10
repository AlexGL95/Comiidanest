import { Controller, Get, Put, Body, Req, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { Equipo } from './equipo.entity';

@Controller('equipos')
export class EquiposController {

    constructor(private equiposService: EquiposService) {}


    //Aqui pega tus API


    @Get()
    getTeams(): Promise<Usuarios[]>{
        return this.equiposService.getTeams();
    }

    @Delete('/:id')
    deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<Equipo[]> {
        return this.equiposService.deleteTeam(id);
    }

}
