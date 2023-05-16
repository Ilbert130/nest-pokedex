
//Con este metodo estamos configurando nuestras variables de entorno para que tengan un valor por defecto 
//y estas se puedan injectar como una dependencia.
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3004,
    default_limit: process.env.DEFAULT_LIMIT || 7
});