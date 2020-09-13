import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';
import { EquipoReceta } from '../equipo-receta/equipo-receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Equipo, Usuarios, EquipoReceta ])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
