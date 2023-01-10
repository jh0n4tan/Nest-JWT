import { registerAs } from '@nestjs/config';

export default registerAs('auth',()=>({
    secret_key:process.env.SECRET_KEY, 
}));