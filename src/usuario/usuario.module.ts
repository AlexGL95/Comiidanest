import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { AuthController } from './autenticacion/auth.controller';
import { JwtStrategy } from './autenticacion/jwt.strategy';
import { EquiposService } from '../equipo/equipo.service';
import { UsuarioController } from './usuario.controller';
import { RondasService } from '../ronda/ronda.service';
import { ErrorService } from '../error/error.service';
import { UsuarioService } from './usuario.service';
import { Equipo } from '../equipo/equipo.entity';
import { PassportModule} from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rondas } from '../ronda/ronda.entity';
import { Err } from 'src/error/error.entity';
import { Usuarios } from './usuario.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Err } from 'src/error/error.entity';
import { ErrorService } from 'src/error/error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EquipoReceta,
            Usuarios, 
            Rondas, 
            Equipo, 
            Err]),
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
    controllers: [
        UsuarioController, 
        AuthController,
    ],
    providers: [
        UsuarioService, 
        EquiposService, 
        RondasService, 
        ErrorService,
        JwtStrategy, 
    ],
    exports:[
        PassportModule,
        JwtStrategy, 
    ]
})
export class UsuarioModule {}
