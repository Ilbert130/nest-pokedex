import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

//Creando el pipe para mongoid
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }

    return value;
  }
}
