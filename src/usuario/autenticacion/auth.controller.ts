//Modules
import { Controller, Post, Body, Res, UnauthorizedException, HttpStatus, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//Services
import { UsuarioService } from '../usuario.service';
//Interfaces
import { CreateUsuariodto } from '../dto/create_usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private auth: UsuarioService,
        private jwtService:JwtService,
    ){}

   @Post('/singin')
   async singIn(@Body()authCredentials:CreateUsuariodto, @Res() response){
       let user = await this.auth.validatepass(authCredentials);
       if(!user){
           throw new UnauthorizedException('Credenciales invalidas');
       }else{
           let name= user.nombre;
           const payload = { name };
           const accesstoken = await this.jwtService.sign(payload);
           user.token = accesstoken;
           if (user.equipo) {
               response.status(HttpStatus.ACCEPTED).json({nombre:user.nombre, token: user.token, super:user.super, iduser: user.id, fechaDeEquipo: user.equipo.fecha, idequipo: user.equipo.id}) ; 
           } else {
               response.status(HttpStatus.ACCEPTED).json({nombre:user.nombre, token: user.token, super:user.super, iduser: user.id}) ;
           }
       }

   }
   @Get()
   @UseGuards(AuthGuard())
   async verify(@Res() response){
    response.status(HttpStatus.OK).json({autorized: true});
   }
}
