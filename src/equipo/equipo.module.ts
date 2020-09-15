import { Module } from '@nestjs/common';
import { EquiposService } from './equipo.service';
import { EquiposController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from './equipo.entity';
import { Usuarios } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Equipo, Usuarios, EquipoReceta ])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
