import { Module } from '@nestjs/common';
import { Err } from "./error.entity";
import { ErrorService } from './error.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ Err ])],
  providers: [ErrorService]
})
export class ErrorModule {}
