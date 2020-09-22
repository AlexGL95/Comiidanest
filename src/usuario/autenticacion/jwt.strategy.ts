//Modules
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
//Entities
import { Usuarios } from '../usuario.entity';
//Interfaces
import { JwtPayload } from './jwt_payload.interface'
//Repositories
import { UsuariosRepository } from '../usuario.repository';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsuariosRepository)
        private userrep: UsuariosRepository,
    ){
       
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'CadenaIndecifrable',
        });
    }

    async validate(payload: JwtPayload):Promise<Usuarios>{
        const { usuario } = payload;
        const user = await this.userrep.findOne( usuario );
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}