import { Controller, Get, Req, Post, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateUsuariodto } from './dto/create-usuariodto';
import { UsuarioService } from './usuario.service';
import { response } from 'express';




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
    getall(@Res() response){
        this.usuariosservice.getAll().then(usuarioslist =>{
            response.status(HttpStatus.OK).json(usuarioslist);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion de usuarios'});
        });
    }

    @Put(':id')
    update(@Body() updateUsuarioDto: CreateUsuariodto, @Res() response,@Param('id') idusuario){
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
