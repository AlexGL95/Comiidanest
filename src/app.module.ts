import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuario/usuario.entity';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioController } from './usuario/usuario.controller';
import { AuthController } from './usuario/autenticacion/auth.controller';
import { EquiposModule } from './equipo/equipo.module';
import { RecetasModule } from './receta/receta.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './usuario/autenticacion/jwt.strategy';
import { RondasModule } from './ronda/ronda.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'comiidav2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Usuarios]),
    RecetasModule,
    EquiposModule,
    JwtModule.register({
      secret:'CadenaIndecifrable',
      signOptions:{
        expiresIn: 3600,
      },
    }),
    EquiposModule,
    RondasModule,
    JwtModule.register({
      secret:'CadenaIndecifrable',
      signOptions:{
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [
    AppController, 
    UsuarioController, 
    AuthController,
  ],
  providers: [
    AppService, 
    UsuarioService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AppModule {}
