import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './equipos.entity';
import { Repository } from 'typeorm';
import { Equipos } from './interfaces/equipos.interface';

@Injectable()
export class EquiposService {

    constructor(
        @InjectRepository(Equipo)
        private equiposRepository: Repository<Equipo>,
    ) {}

    //Aqui pega tus apis con la entidad Equipo

}
