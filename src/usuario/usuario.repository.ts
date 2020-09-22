//Modules
import { EntityRepository, Repository } from 'typeorm';
//Entities
import { Usuarios } from './usuario.entity';

@EntityRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios>{
}