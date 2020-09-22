//Modulos
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { EquipoRecetaService } from "./equipo_receta.service";
import { ErrorService } from 'src/error/error.service';
//Controllers
import { EquipoRecetaController } from "./equipo_receta.controller";
//Entitys
import { EquipoReceta } from "./equipo_receta.entity";
import { Equipo } from "../equipo/equipo.entity";
import { Recetas } from "../receta/receta.entity";
import { Err } from 'src/error/error.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EquipoReceta, Equipo, Recetas, Err])],
    controllers: [EquipoRecetaController],
    providers: [EquipoRecetaService, ErrorService]
})
export class EquipoRecetaModule {}
