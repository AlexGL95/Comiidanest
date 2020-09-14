import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';
import { Equipo } from './equipo.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Equipo, Usuarios, EquipoReceta ])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
