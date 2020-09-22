//Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { RecetasService } from './receta.service';
import { ErrorService } from 'src/error/error.service';
//Controllers
import { RecetasController } from './receta.controller';
//Entities
import { Recetas } from './receta.entity';
import { Err } from 'src/error/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recetas, Err])],
  controllers: [RecetasController],
  providers: [RecetasService, ErrorService]
})
export class RecetasModule {}
