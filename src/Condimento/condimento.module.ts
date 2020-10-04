import { Module } from '@nestjs/common';
import { CondimentoService } from './condimento.service';
import { CondimentoController } from './condimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condimento } from './condimento.entity';
import { ErrorService } from '../error/error.service';
import { Err } from 'src/error/error.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Condimento, Err ])],
  providers: [CondimentoService, ErrorService],
  controllers: [CondimentoController]
})
export class CondimentoModule {}
