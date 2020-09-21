import { Controller, Put, Body, Res, HttpStatus } from '@nestjs/common';
import { EquipoRecetaService } from "./equipo_receta.service";
import { assignRecipeDto } from "./dto/assign_recipe.dto";

@Controller('equipo_receta')
export class EquipoRecetaController {

    constructor(private equipoRecetaService: EquipoRecetaService) {}

    //API assignReceta( NOTA:DA POR HECHO QUE DESDE FRONT SE VALIDA QUE ESTE EN TIEMPO DE SELECCION ).
    @Put()
    assignRecipe( @Body() asignacion: assignRecipeDto, @Res() response ) {
        this.equipoRecetaService.assignRecipe( asignacion.idEquipo, asignacion.idRecetas )
            .then( () => {
                response.status(HttpStatus.OK).json( {mensaje:"Recetas asignadas"} );
            } )
            .catch( err => {
                response.status(HttpStatus.CONFLICT).json(err);
            } );
    }

}
