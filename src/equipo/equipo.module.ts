//Modulos
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { EquiposService } from './equipo.service';
import { RondasService } from '../ronda/ronda.service';
import { ErrorService } from 'src/error/error.service';
//Controllers
import { EquiposController } from './equipo.controller';
//Entitys
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from './equipo.entity';
import { Usuarios } from 'src/usuario/usuario.entity';
import { Rondas } from '../ronda/ronda.entity';
import { Err } from 'src/error/error.entity';
import { RecetasService } from '../receta/receta.service';
import { Recetas } from '../receta/receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Equipo, Usuarios, EquipoReceta, Rondas, Err, Recetas ])],
  providers: [EquiposService, RondasService, ErrorService, RecetasService],
  controllers: [EquiposController]
})
export class EquiposModule {}
