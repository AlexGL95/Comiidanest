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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Konjikinogashbell25()',
      database: 'comiidav2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuarios]),
    RecetasModule,
    EquiposModule
  ],
  controllers: [AppController, UsuarioController, AuthController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
