import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Para determinar que es una entidad en mongoose
@Schema()
export class Pokemon extends Document{

    //Agregando validaciones
    @Prop({
        unique:true,
        index:true
    })
    name:string;

    @Prop({
        unique:true,
        index:true
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);