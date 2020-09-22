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

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo, Rondas, Usuarios])],
  controllers: [RondasController],
  providers: [RondasService]
})
export class RondasModule {}
