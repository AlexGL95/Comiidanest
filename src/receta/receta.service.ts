//Modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//Services
import { ErrorService } from 'src/error/error.service';
//Controllers
//Entities
import { Recetas } from './receta.entity';
//Interfaces
import { Receta } from './interface/receta.interface';
import { insertRecetas } from './dto/insert_receta.dto';


@Injectable()
export class RecetasService {

    constructor(
        @InjectRepository(Recetas)
        private recetasRepository: Repository<Recetas>,
        private errorService: ErrorService
    ) {}

    //Metodo para buscar todas las recetas.
    async getAll(): Promise<Receta[]> {
        return await this.recetasRepository.find();
    }

    //Metodo para buscar una receta por su id.
    async getById( id ): Promise<Receta> {
        const receta =  await this.recetasRepository.findOne(id);
        //Si la encuentra, la retorna, si no, retorna un error.
        if(receta) {
            return receta;
        } else {
            this.errorService.throwError("T-802");
        }
    }

    //Metodo para buscar una receta por su nombre.
    async getByName( nombre: string ): Promise<Receta> {
        const receta = await this.recetasRepository.findOne( { where: { nombre: nombre.toLowerCase()} } );
        //Si la encuentra, la retorna, si no, retorna un error.
        if(receta) {
            return receta;
        } else {
            this.errorService.throwError("T-802");
        }
    }

    //Metodo para crear una receta.
    async createReceta( newReceta: insertRecetas ) {
        const recetasArr = await this.recetasRepository.findOne({ where: { nombre: `${newReceta.nombre}` } });
        //Si existe, se retorna un error, si no, se guarda en la base de datos.
        if (recetasArr) {
            this.errorService.throwError("T-806");
        } else {
            return await this.recetasRepository.save(newReceta);
        }
    }

    //Metodo para eliminar una receta por su ID.
    async deleteReceta( id :number ) {
        const receta = await this.recetasRepository.findOne(id);
        //Si existe, la elimina, si no, retorna un error.
        if (receta) {
            return await this.recetasRepository.delete(id);
        } else {
            this.errorService.throwError("T-802");
        }
    }

    //Metodo para cambiar el estado de una receta.
    async changeStateById( id: number ) {
        const receta = await this.recetasRepository.findOne(id);
        //Si la encuentra, la actualiza, si no, retorna un error.
        if (receta) {
            receta.activo = !receta.activo;
            return await this.recetasRepository.update(receta.id,receta);
        } else {
            this.errorService.throwError("T-802");
        }
    }
    // Cambia el estado de todas las recetas a falso
    async changeall( ) {
        const receta = await this.recetasRepository.find();
        //Si la encuentra, la actualiza, si no, retorna un error.
        if (receta.length > 0) {
            for (let index = 0; index < receta.length; index++) {
                receta[index].activo = false;
                return await this.recetasRepository.update(receta[index].id,receta[index]);
            }
            
        }
    }

    //Metodo para crear un objeto con todos los ingredientes de las recetas activas.    
    async getIngr() {
        const recetasArr = await this.recetasRepository.find({ where: { activo: true } });
        if (recetasArr.length > 0) {
            let ingredientes: String = "";
            //Concatena todos los ingredientes de las recetas activas
            for (let m = 0; m < recetasArr.length; m++) {
                const recetaActiva = recetasArr[m];
                //Si es la primera interracion
                if (m === 0) {
                    ingredientes += recetaActiva.nombre;
                    ingredientes += "/" + recetaActiva.ingredientes;
                }
                else {
                    ingredientes += "/" + recetaActiva.nombre;
                    ingredientes += "/" + recetaActiva.ingredientes;
                }   
            }
            return ingredientes;
        } else {
            this.errorService.throwError("T-815");
        } 
    }
}
