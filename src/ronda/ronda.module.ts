import { Module } from '@nestjs/common';
import { RondasController } from './ronda.controller';
import { RondasService } from './ronda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipo/equipo.entity';
import { Rondas } from './ronda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    TypeOrmModule.forFeature([Rondas])],
  controllers: [RondasController],
  providers: [RondasService]
})
export class RondasModule {}
