import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [

    //Expedir contenido estico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //Importando la base de datos, para usarla, colocamos la cadena de conexion
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    //Modelos de mi api
    PokemonModule,
    CommonModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
