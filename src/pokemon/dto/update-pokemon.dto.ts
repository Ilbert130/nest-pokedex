import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//Tendra todas las propiedades de CreatePokemonDto pero opcionales
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
