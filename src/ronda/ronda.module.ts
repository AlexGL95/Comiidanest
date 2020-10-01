//Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { RondasService } from './ronda.service';
//Controllers
import { RondasController } from './ronda.controller';
//Entities
import { Equipo } from 'src/equipo/equipo.entity';
import { Rondas } from './ronda.entity';
import { Usuarios } from 'src/usuario/usuario.entity';
import { EquiposService } from 'src/equipo/equipo.service';
import { EquipoReceta } from 'src/equipo_receta/equipo_receta.entity';
import { Err } from 'src/error/error.entity';
import { ErrorService } from 'src/error/error.service';
import { RecetasService } from '../receta/receta.service';
import { Recetas } from '../receta/receta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo, Rondas, Usuarios, EquipoReceta, Err, Recetas])],
  controllers: [RondasController],
  providers: [RondasService, EquiposService, ErrorService, RecetasService]
})
export class RondasModule {}
