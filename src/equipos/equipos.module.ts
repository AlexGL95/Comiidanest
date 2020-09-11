import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipo.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    TypeOrmModule.forFeature([Usuarios])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
