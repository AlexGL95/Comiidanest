import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo])],
  providers: [EquiposService],
  controllers: [EquiposController]
})
export class EquiposModule {}
