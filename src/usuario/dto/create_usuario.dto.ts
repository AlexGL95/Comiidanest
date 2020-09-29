import { IsNotEmpty, IsString, MinLength, Matches, MaxLength, IsNumber, IsBoolean, IsOptional } from 'class-validator';
export class CreateUsuariodto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @MinLength(8)
    @MaxLength(90)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message:'La contraseña es muy debil'}, //se requiere al menos una letra mayuscula una minuscula y un numero o caracter especial
    )
    @IsOptional()
    pass?:string;
    
    @IsString()
    @IsOptional()
    newpass?:string;
    
    @IsString()
    @IsOptional()
    token?:string;

    @IsBoolean()
    @IsOptional()
    super?:boolean;

    @IsNumber()
    @IsOptional()
    readonly equipoid?;
}
