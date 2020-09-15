import { Module } from '@nestjs/common';
import { RecetasController } from './receta.controller';
import { RecetasService } from './receta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recetas } from './receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recetas])],
  controllers: [RecetasController],
  providers: [RecetasService]
})
export class RecetasModule {}
