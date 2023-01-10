import { registerAs } from '@nestjs/config';

export default registerAs('mongo',()=>({
    host:process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT,10) || 27017,
    user:process.env.MONGO_USER,
    password:process.env.MONGO_PASSWORD,
    database:process.env.MONGO_DATABASE    
}));