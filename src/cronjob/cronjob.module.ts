//Modulos
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { RondasService } from '../ronda/ronda.service';
import { EquiposService } from '../equipo/equipo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { EquipoRecetaService } from '../equipo_receta/equipo_receta.service';
import { RecetasService } from '../receta/receta.service';
import { CronjobService } from './cronjob.service';
import { ErrorService } from '../error/error.service';
//Entitys
import { Equipo } from 'src/equipo/equipo.entity';
import { Rondas } from '../ronda/ronda.entity';
import { Usuarios } from '../usuario/usuario.entity';
import { EquipoReceta } from 'src/equipo_receta/equipo_receta.entity';
import { Recetas } from '../receta/receta.entity';
import { Err } from 'src/error/error.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Rondas,Equipo,Usuarios,EquipoReceta,Recetas,Err])
    ],
    controllers:[],
    providers:[RondasService,EquiposService,UsuarioService,EquipoRecetaService,RecetasService,CronjobService,ErrorService],
})
export class CronjobModule {}
