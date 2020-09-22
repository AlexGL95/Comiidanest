//Modulos
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Services
import { ErrorService } from './error.service';
//Entitys
import { Err } from "./error.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ Err ])],
  providers: [ErrorService]
})
export class ErrorModule {}
