import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { UsuarioService } from './usuario.service';




@Controller('usuarios')
export class UsuarioController {
    
    constructor(private usuariosservice: UsuarioService){

    }

    @Post()
    create (@Body() createUsuarioDto: CreateUsuariodto,@Res() response ){
        this.usuariosservice.createUser(createUsuarioDto).then( usuariom =>{
            response.status(HttpStatus.CREATED).json(usuariom);
        }).catch( ()=>{
            response.status(HttpStatus.CONFLICT).json({usuariom:"Error en la creacion del usuario"});
        });
    }

    @Get()
    @UseGuards(AuthGuard())
    getall(@Res() response){
        this.usuariosservice.getAll().then(usuarioslist =>{
            response.status(HttpStatus.OK).json(usuarioslist);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion de usuarios'});
        });
    }

    @Put(':id')
    update(@Body(ValidationPipe) updateUsuarioDto: CreateUsuariodto, @Res() response,@Param('id') idusuario){
        this.usuariosservice.updateUsuario(idusuario,updateUsuarioDto).then(usuarioactualizado =>{
            response.status(HttpStatus.OK).json(usuarioactualizado);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'Error en la actualizacion del usuario'});
        });
    }

    @Delete(':id')
    delete(@Res() response,@Param('id') idusuario){
        this.usuariosservice.deleteusuario(idusuario).then(delusuario =>{
            response.status(HttpStatus.OK).json(delusuario);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'Error al eliminar el usuario'});
        });
    }
}
