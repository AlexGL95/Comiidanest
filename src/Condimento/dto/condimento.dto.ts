import { IsString } from 'class-validator';


export class CreateCondimentodto {

    @IsString()
    nombre : string;
}