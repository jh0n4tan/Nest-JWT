import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './utils/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService:UsersService,
        private jwtService:JwtService        
        ){}

    async validateUser(authCredentials:AuthDto){
        const user = await this.userService.findUserByEmail(authCredentials.email);

        if(user){
            const passwordOd = await bcrypt.compare(
                authCredentials.password, user.password)
            
            if(passwordOd){
                return user;
            }
        }

        return null
    }

    async login(authCredentials:AuthDto){
        const user = await this.validateUser(authCredentials);

        if(!user) throw new UnauthorizedException('invalid credentials');

        const payload:JwtPayload = {
            email:user.email
        }

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
