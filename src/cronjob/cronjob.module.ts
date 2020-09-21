import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/equipo.entity';
import { Rondas } from '../ronda/ronda.entity';
import { RondasService } from '../ronda/ronda.service';
import { EquiposService } from '../equipo/equipo.service';
import { Usuarios } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { EquipoRecetaService } from '../equipo_receta/equipo_receta.service';
import { EquipoReceta } from 'src/equipo_receta/equipo_receta.entity';
import { Recetas } from '../receta/receta.entity';
import { RecetasService } from '../receta/receta.service';
import { CronjobService } from './cronjob.service';
import { ErrorService } from '../error/error.service';
import { Err } from 'src/error/error.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Rondas,Equipo,Usuarios,EquipoReceta,Recetas,Err])
    ],
    controllers:[],
    providers:[RondasService,EquiposService,UsuarioService,EquipoRecetaService,RecetasService,CronjobService,ErrorService],
})
export class CronjobModule {}
