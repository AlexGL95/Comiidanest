import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoReceta } from "./equipo_receta.entity";
import { Equipo } from "../equipo/equipo.entity";
import { Recetas } from "../receta/receta.entity";
import { Repository } from 'typeorm';
import { merge } from 'rxjs';
import { ErrorService } from 'src/error/error.service';

@Injectable()
export class EquipoRecetaService {

    constructor(
        @InjectRepository(EquipoReceta)
        private equipoRecetaRepository: Repository<EquipoReceta>,
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,
        @InjectRepository(Recetas)
        private RecetaRepository: Repository<Recetas>,
        private errorService: ErrorService
    ) {}

    //Metodo para crear un nuevo renglon en la base de datos
    async createRow( idEquipo: number, idRecetas: number[] ) {
        let equipoTemp = await this.equipoRepository.findOne(idEquipo);
        //Si el equipo se encuentra, sigue, si no, retorna error
        if ( equipoTemp ) {
            for (let m = 0; m < idRecetas.length; m++) {
                let recetasTemp = await this.RecetaRepository.findOne(idRecetas[m]);
                //Si la receta se encuentra, sigue, si no, retorna error
                if ( recetasTemp ) {
                    let newRow = {equipo: equipoTemp, recetas: recetasTemp};   
                    await this.equipoRecetaRepository.save(newRow);
                } else {
                    this.errorService.throwError("T-802");
                }
            }
        } else {
            this.errorService.throwError("T-803");
        }
    }

    //Metodo para eliminar cualquier asignacion al equipo enviado
    async deleteRow( idEquipo: number ) {
        let equipoTemp = await this.equipoRepository.findOne(idEquipo);
        //Si el equipo se encuentra, sigue, si no, retorna error
        if ( equipoTemp ) {
            let recetasDelEquipo = await this.equipoRecetaRepository.find( { where:{ equipo: equipoTemp } } );
            for (let m = 0; m < recetasDelEquipo.length; m++) {
                await this.equipoRecetaRepository.delete(recetasDelEquipo[m].id);
            }
        } else {
            this.errorService.throwError("T-803");
        }
    }

    //Metodo para asignar recetas a un equipo enviado
    async assignRecipe( idEquipo: number, idRecetas: number[] ) {
        try {
            await this.deleteRow( idEquipo );    
        } catch (err) {
            throw err;
        }
        try {
            await this.createRow( idEquipo, idRecetas );    
        } catch (err) {
            throw err;   
        }
    }
}
