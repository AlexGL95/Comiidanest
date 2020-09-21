import { Module } from '@nestjs/common';
import { RondasController } from './ronda.controller';
import { RondasService } from './ronda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/equipo.entity';
import { Rondas } from './ronda.entity';
import { Usuarios } from 'src/usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo, Rondas, Usuarios])],
  controllers: [RondasController],
  providers: [RondasService]
})
export class RondasModule {}
