import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)                      //Para usar el modelo de base de datos
    private readonly pokemonModule: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {

    await this.pokemonModule.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert:{name:string, no:number}[] = [];

    data.results.forEach(({name, url})=>{
      
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      pokemonToInsert.push({name, no});
    });

    await this.pokemonModule.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
