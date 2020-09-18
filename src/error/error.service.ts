import { Injectable } from '@nestjs/common';
import { Err } from "./error.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ErrorService {

    constructor(
        @InjectRepository(Err)
        private errorRepository: Repository<Err>
    ) {}

    //Metodo para arrojar un objeto error por su codigo
    async throwError( codigo: string ) {
        let errTemp = await this.errorRepository.findOne( { where:{ codigo: codigo } } );
        let error: Error = {
            name: errTemp.codigo, message: errTemp.descripcion
        }
        throw error;
    }

}
