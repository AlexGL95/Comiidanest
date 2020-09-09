import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>
    ){} 

    async getAll() {
        return await this.userRepository.find();
    }


}
