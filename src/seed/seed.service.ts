import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;
  
  constructor(
    @InjectModel(Pokemon.name)                      //Para usar el modelo de base de datos
    private readonly pokemonModule: Model<Pokemon>
  ) {}

  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    data.results.forEach(async({name, url})=>{
      
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      const pokemon = await this.pokemonModule.create({name, no});
    })

    return 'Seed Executed';
  }
}
