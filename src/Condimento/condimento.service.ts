import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condimento } from './condimento.entity';
import { Repository } from 'typeorm';
import { CreateCondimentodto } from './dto/condimento.dto';
import { ErrorService } from '../error/error.service';

@Injectable()
export class CondimentoService {

    constructor(
        @InjectRepository(Condimento)
        private condimentoRepository : Repository<Condimento>,
        private serverr : ErrorService,

    ){}

    async getall() : Promise<Condimento[]> {
        return await this.condimentoRepository.find();
    }

    async createccon( newcond : CreateCondimentodto ): Promise<Condimento>{
        const cond = await this.condimentoRepository.findOne({ where: { nombre: `${newcond.nombre}` } });
        let condi = new Condimento;
        if (cond) {
            await this.serverr.throwError('T-815');
        } else {
            condi.nombre=newcond.nombre;
            return await this.condimentoRepository.save(condi);
        }
    }

    async delete( id: number ) : Promise <any>{
        const cond = await this.condimentoRepository.findOne({ where: { id: `${id}` } });
        if (!cond) {
            this.serverr.throwError('T-816');
        } else {
            return await this.condimentoRepository.delete(id);
        }
    }


}
