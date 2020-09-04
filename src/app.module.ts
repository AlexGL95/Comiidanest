import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Error } from './errores/error.entity';
import { Usuario } from './usuarios/usuario';
import { UsuarioService } from './usuarios/usuario.service';
import { from } from 'rxjs';
import { UsuarioController } from './usuarios/usuario.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'comiidav2',
      entities: [Error,Usuario],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
