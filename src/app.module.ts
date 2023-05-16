import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    //Para la configuracion de las variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfiguration], //Este es el metodo que usamos para configurar nuestars variables de entorno
      validationSchema: JoiValidationSchema //validando la data de las variables de entornos
    }),

    //Expedir contenido estico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    //Importando la base de datos, para usarla, colocamos la cadena de conexion
    MongooseModule.forRoot(process.env.MONGODB),

    //Modelos de mi api
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
