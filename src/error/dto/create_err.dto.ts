import { IsString } from "class-validator";

export class Createerrdto{
    constructor(){
        this.codigo=0;
        this.descripcion='';
    }
    @IsString()
    codigo;

    @IsString()
    descripcion;

}