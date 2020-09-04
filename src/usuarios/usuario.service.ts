import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>
    ){} 

    async getAll() {
        return await this.userRepository.find();
    }


}
