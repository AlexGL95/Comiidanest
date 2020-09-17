import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoReceta } from "./equipo_receta.entity";
import { Equipo } from "../equipo/equipo.entity";
import { Recetas } from "../receta/receta.entity";
import { EquipoRecetaController } from "./equipo_receta.controller";
import { EquipoRecetaService } from "./equipo_receta.service";

@Module({
    imports: [TypeOrmModule.forFeature([EquipoReceta, Equipo, Recetas])],
    controllers: [EquipoRecetaController],
    providers: [EquipoRecetaService]
})
export class EquipoRecetaModule {}
