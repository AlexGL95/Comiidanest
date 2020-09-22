//Modules
import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//Services
import { UsuarioService } from './usuario.service';
//Interfaces
import { CreateUsuariodto } from './dto/create_usuario.dto';

@Controller('usuarios')
export class UsuarioController {
    
    constructor(
        private usuariosservice: UsuarioService
    ) {}

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
    delete( @Param('id') id, @Res() response ) {
        this.usuariosservice.deleteUsuario( id )
            .then( () => {
                response.status(HttpStatus.OK).json( {Mensaje:`User ${id} eliminated.`} );
            } )
            .catch( err =>{
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }
}
