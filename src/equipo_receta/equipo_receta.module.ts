import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoReceta } from "./equipo_receta.entity";
import { Equipo } from "../equipo/equipo.entity";
import { Recetas } from "../receta/receta.entity";
import { EquipoRecetaController } from "./equipo_receta.controller";
import { EquipoRecetaService } from "./equipo_receta.service";
import { Err } from 'src/error/error.entity';
import { ErrorService } from 'src/error/error.service';

@Module({
    imports: [TypeOrmModule.forFeature([EquipoReceta, Equipo, Recetas, Err])],
    controllers: [EquipoRecetaController],
    providers: [EquipoRecetaService, ErrorService]
})
export class EquipoRecetaModule {}
