//Modules
import { JwtStrategy } from './autenticacion/jwt.strategy';
import { PassportModule} from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//Services
import { EquiposService } from '../equipo/equipo.service';
import { RondasService } from '../ronda/ronda.service';
import { ErrorService } from '../error/error.service';
import { UsuarioService } from './usuario.service';
//Controllers
import { AuthController } from './autenticacion/auth.controller';
import { UsuarioController } from './usuario.controller';
//Entities
import { EquipoReceta } from '../equipo_receta/equipo_receta.entity';
import { Equipo } from '../equipo/equipo.entity';
import { Rondas } from '../ronda/ronda.entity';
import { Err } from 'src/error/error.entity';
import { Usuarios } from './usuario.entity';

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
