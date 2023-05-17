import * as Joi from "joi";

//Estas son las validaciones que hacemos y colocamos en el app module, valida el tipo de valor
export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6)
})