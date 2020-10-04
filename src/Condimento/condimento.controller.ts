import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Param } from '@nestjs/common';
import { CondimentoService } from './condimento.service';
import { CreateCondimentodto } from './dto/condimento.dto';

@Controller('condimento')
export class CondimentoController {

    constructor(
        private consimentoService : CondimentoService,
    ){}
    
    @Get()
     async getall(@Res() res){
        const cond = await this.consimentoService.getall();
        if (cond) {
            res.status(HttpStatus.OK).json(cond);
        } else {
            res.status(HttpStatus.NOT_FOUND).json('Error en la obtencion');
        }
    }

    @Post()
    create(@Res() res, @Body() CreateCondimentodto: CreateCondimentodto){
        this.consimentoService.createccon( CreateCondimentodto ).then( cond => {
            res.status(HttpStatus.OK).json(cond);
        }).catch(() => {
            res.status(HttpStatus.CONFLICT).json({mensaje: 'Error en la creacion del condimento'});
        });
        
    }

    @Delete(':id')
    delete(@Res() res, @Param('id') id){
        this.consimentoService.delete(id).then(cond =>{
            res.status(HttpStatus.OK).json({mensaje: 'se elimino correctamente'});
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({mensaje:'Error al eliminar'})
        });
    }
}
