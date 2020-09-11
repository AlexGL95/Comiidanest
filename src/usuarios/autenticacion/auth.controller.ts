import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../../usuarios/usuario.service';
import { CreateUsuariodto } from '../dto/create-usuariodto';

@Controller('auth')
export class AuthController {
    constructor(
        private auth: UsuarioService,
    ){}

   @Post('/singin')
   async singIn(@Body()authCredentials:CreateUsuariodto,@Res() response){
       const user = await this.auth.validatepass(authCredentials);
       if(!user){
           throw new UnauthorizedException('Credenciales invalidas');
       }else{
        throw new UnauthorizedException('Parece que no pero si esta chido');
       }
   }
}
