import { Module } from '@nestjs/common';
import { RecetasController } from './recetas.controller';
import { RecetasService } from './recetas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recetas } from './recetas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recetas])],
  controllers: [RecetasController],
  providers: [RecetasService]
})
export class RecetasModule {}
