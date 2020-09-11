import { EntityRepository, Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@EntityRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios>{
        
    


}