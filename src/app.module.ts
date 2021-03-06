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
import { ErrorModule } from './error/error.module';
import { CondimentoModule } from './Condimento/condimento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'oruzservice.com',
      port: 3306,
      username: 'oruzserv_comiida',
      password: 'eC-p(keT.[8u',
      database: 'oruzserv_comiida',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RecetasModule,
    EquiposModule,
    UsuarioModule,
    RondasModule,
    EquipoRecetaModule,
    ScheduleModule.forRoot(),
    CronjobModule,
    ErrorModule,
    CondimentoModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ]
})
export class AppModule {}
