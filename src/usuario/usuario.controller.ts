import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { UsuarioService } from './usuario.service';
import { RondasService } from '../ronda/ronda.service';

@Controller('usuarios')
export class UsuarioController {
    
    constructor(
        private usuariosservice: UsuarioService,
        private rondasService: RondasService,
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
                //1.-Verifica si hay una ronda activa.
                let rondasArr = this.rondasService.getRondas();
                console.log(rondasArr);
                    //2.-Si no, elimina el usuario.
                    //3.-Si si, busca si el usuario pertenece a un equipo activo.
                        //4.-Si no, elimina el usuario.
                        //5.-Si si, busca el ultimo equipo de la ronda.
                        //6.-Cambia las fechas del equipo al que pertenece el usuario y la del ultimo equipo.
                        //7.-Llama la funcion recortar ronda.
                response.status(HttpStatus.OK).json( {Mensaje:`User ${id} eliminated.`} );
            } )
            .catch( err =>{
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }
}
