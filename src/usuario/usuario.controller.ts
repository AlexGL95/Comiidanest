//Modules
import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param, ValidationPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//Services
import { UsuarioService } from './usuario.service';
//Interfaces
import { CreateUsuariodto } from './dto/create_usuario.dto';
import { RondasService } from '../ronda/ronda.service';

@Controller('usuarios')
export class UsuarioController {
    
    constructor(
        private usuariosservice: UsuarioService,
        private rondasService: RondasService
    ) {}

    @Post()
     create (@Body() createUsuarioDto: CreateUsuariodto,@Res() response ){
        this.usuariosservice.createUser(createUsuarioDto).then(  usuariom =>{
            this.rondasService.recalcularRondas();
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

    @Get(':id')
    async getone(@Param('id') idusuario, @Res() response){
        const user = await this.usuariosservice.getById(idusuario);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        } else {
            response.status(HttpStatus.ACCEPTED).json({nombre:user.nombre}) ;
        }
        
        /*.then(usuarioslist =>{
            response.status(HttpStatus.OK).json(usuarioslist);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la obtencion del usuario'});
        })*/
    }

    @Put('/:id')
    async update(@Body() updateUsuarioDto: CreateUsuariodto, @Res() response,@Param('id') idusuario){
        console.log('se putio sin if');
        if (updateUsuarioDto.nombre && !updateUsuarioDto.pass) {
           this.usuariosservice.updateUsername(idusuario,updateUsuarioDto);
           await response.status(HttpStatus.OK).json('Todo correcto');
        }else if(updateUsuarioDto.newpass) {
            console.log('se putio');
            this.usuariosservice.updatepass(idusuario,updateUsuarioDto);
           await response.status(HttpStatus.OK).json('Todo correcto contraseña');
        }else{
           this.usuariosservice.updateUsuario(idusuario,updateUsuarioDto);
       }
        
        
        /*.then(usuarioactualizado =>{
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'Error en la actualizacion del usuario'});
        });*/
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
