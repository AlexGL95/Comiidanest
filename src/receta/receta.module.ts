import { Module } from '@nestjs/common';
import { RecetasController } from './receta.controller';
import { RecetasService } from './receta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recetas } from './receta.entity';
import { ErrorService } from 'src/error/error.service';
import { Err } from 'src/error/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recetas, Err])],
  controllers: [RecetasController],
  providers: [RecetasService, ErrorService]
})
export class RecetasModule {}
