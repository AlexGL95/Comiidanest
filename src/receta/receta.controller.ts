import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { RecetasService } from './receta.service';
import { insertRecetas } from './dto/insert_receta.dto';

@Controller('recetas')
export class RecetasController {

    constructor (private recetasService: RecetasService) {}

    //API getAll.
    @Get()
    getAll( @Res() response ) {
        this.recetasService.getAll()
            .then( recetasArr => {
                response.status(HttpStatus.OK).json(recetasArr);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API getById.
    @Get('/id/:id')
    getById( @Param('id') id, @Res() response ) {
        this.recetasService.getById(id)
            .then( recetaFound => {
                response.status(HttpStatus.OK).json(recetaFound);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API getByName.
    @Get('/name/:nombre')
    getByName( @Param('nombre') nombre, @Res() response ) {
        this.recetasService.getByName(nombre)
            .then( recetaFound => {
                response.status(HttpStatus.OK).json(recetaFound);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API insert.
    @Post()
    insert( @Body() newReceta: insertRecetas, @Res() response ) {
        this.recetasService.createReceta(newReceta)
            .then( recetaCreated => {
                response.status(HttpStatus.OK).json(recetaCreated);
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API deleteById.
    @Delete('/:id')
    deleteById( @Param('id') id: number, @Res() response  ) {
        this.recetasService.deleteReceta(id)
            .then( () => {
                response.status(HttpStatus.OK).json( {Mensaje: `Recipe ${id} deleted` } );
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API changeStateById.
    @Put('/change/:id')
    changeStateById( @Param('id') id: number, @Res() response ) {
        this.recetasService.changeStateById(id)
            .then( () => {
                response.status(HttpStatus.OK).json( { Mensaje: `Changed status` } );
                } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

    //API getIng.
    @Get('/ing')
    getIng( @Res() response ) {
        this.recetasService.getIngr()
            .then( ingredientes => {
                response.status(HttpStatus.OK).json(ingredientes);
                } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }
}
