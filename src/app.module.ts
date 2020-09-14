import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios/usuarios.entity';
import { UsuarioService } from './usuarios/usuario.service';
import { UsuarioController } from './usuarios/usuario.controller';
import { AuthController } from './usuarios/autenticacion/auth.controller';
import { EquiposModule } from './equipos/equipos.module';
import { RecetasModule } from './recetas/recetas.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './usuarios/autenticacion/jwt.strategy';
import { RondasModule } from './rondas/rondas.module';
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
    RondasModule
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
