import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposModule } from './equipo/equipo.module';
import { RecetasModule } from './receta/receta.module';
import { RondasModule } from './ronda/ronda.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EquipoRecetaModule } from './equipo_receta/equipo_receta.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobModule } from './cronjob/cronjob.module';
import { CronjobService } from './cronjob/cronjob.service';

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
    RecetasModule,
    EquiposModule,
    UsuarioModule,
    EquiposModule,
    RondasModule,
    EquipoRecetaModule,
    ScheduleModule.forRoot(),
    CronjobModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ]
})
export class AppModule {}
