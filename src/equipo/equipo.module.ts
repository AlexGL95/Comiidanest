import { Module } from '@nestjs/common';
import { EquiposService } from './equipo.service';
import { RondasService } from '../ronda/ronda.service';
import { EquiposController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from './equipo.entity';
import { Usuarios } from 'src/usuario/usuario.entity';
import { Rondas } from '../ronda/ronda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Equipo, Usuarios, EquipoReceta, Rondas ])],
  providers: [EquiposService, RondasService],
  controllers: [EquiposController]
})
export class EquiposModule {}
