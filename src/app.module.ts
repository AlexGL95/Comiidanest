import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Error } from './errores/error.entity';
import { Usuarios } from './usuarios/usuarios.entity';
import { UsuarioService } from './usuarios/usuario.service';
import { from } from 'rxjs';
import { UsuarioController } from './usuarios/usuario.controller';
import { Rondas } from './rondas/rondas.entity';
import { LogErrores } from './log-errores/log-errores.entity';
import { Equipo } from './equipos/equipos.entity';
import { Recetas } from './recetas/recetas.entity';
import { EquipoReceta } from './equipo-receta/equipo-receta.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'comiidav2',
      entities: [Rondas,Usuarios,Error,LogErrores,Equipo,Recetas,EquipoReceta],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuarios])
  ],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
