import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Error } from './errores/error.entity.entity';
import { Usuarios } from './usuarios/usuarios.entity';
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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuarios])
  ],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
