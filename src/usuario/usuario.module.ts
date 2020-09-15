import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuario.entity';
import { Rondas } from '../ronda/ronda.entity';
import { Equipo } from '../equipo/equipo.entity';
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { UsuarioController } from './usuario.controller';
import { AuthController } from './autenticacion/auth.controller';
import { UsuarioService } from './usuario.service';
import { JwtStrategy } from './autenticacion/jwt.strategy';
import { RondasService } from '../ronda/ronda.service';
import { EquiposService } from '../equipo/equipo.service';
import { PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuarios, Rondas, Equipo, EquipoReceta]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
        secret:'CadenaIndecifrable',
        signOptions:{
            expiresIn: 3600,
        },
        }),    
        JwtModule.register({
        secret:'CadenaIndecifrable',
        signOptions:{
            expiresIn: 3600,
        },
        }),
    ],
    controllers: [UsuarioController, AuthController],
    providers: [UsuarioService, JwtStrategy, RondasService, EquiposService],
    exports:[JwtStrategy, PassportModule]
})
export class UsuarioModule {}
