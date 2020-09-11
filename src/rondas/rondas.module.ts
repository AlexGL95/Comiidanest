import { Module } from '@nestjs/common';
import { RondasController } from './rondas.controller';
import { RondasService } from './rondas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipos/equipo.entity';
import { Rondas } from './rondas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipo]),
    TypeOrmModule.forFeature([Rondas])],
  controllers: [RondasController],
  providers: [RondasService]
})
export class RondasModule {}
