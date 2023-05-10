import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  //Asi enjectamos el modelo
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModule: Model<Pokemon>
  ) {

  }
  
  //Create
  async create(createPokemonDto: CreatePokemonDto) {
    //insercion a la base de datos
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModule.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      this.handleExeptions(error);
    }
  }

  //FindAll
  findAll() {
    return `This action returns all pokemon`;
  }

  //FindOne
  async findOne(term: string) {

    let pokemon: Pokemon;

    //Number verification
    if(!isNaN(+term)){
      pokemon = await this.pokemonModule.findOne({no:term});
    }

    //MongoID
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModule.findById(term);
    }

    //Name
    if(!pokemon) {
      pokemon = await this.pokemonModule.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon){
      throw new NotFoundException(`Pokemon with id, name or no ${term} not found`);
    }

    return pokemon;
  }

  //Update
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      
      const pokemon = await this.findOne(term);
      if( updatePokemonDto.name){
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }

      //Actualizadon el pokemon
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      this.handleExeptions(error);
    }
  }

  //Delete
  async remove(id: string) {

    //Eliminando un pokemon
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    return id;
  }


  //Manejador de exeptions no controladas
  private handleExeptions(error:any) {
    //Los errores tienen un codigo por el error
      //debemos usar las exeption filters
      if(error.code === 11000){
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }

      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  } 
}
