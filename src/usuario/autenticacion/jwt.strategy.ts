import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt_payload.interface'
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from '../usuario.entity';
import { UsuariosRepository } from '../usuario.repository';
import { UnauthorizedException } from '@nestjs/common';

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