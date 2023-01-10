import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy} from '@nestjs/passport';
import { UnauthorizedException} from '@nestjs/common';
import { Strategy,ExtractJwt } from 'passport-jwt'
import { UsersService } from 'src/modules/users/users.service';
import { JwtPayload } from '../../utils/jwt.payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(
        private configService:ConfigService,
        private userService:UsersService
        ){
        super(
            {
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: configService.get('auth.secret_key')
            }
        )
    }

    async validate(payload:JwtPayload){
        const user = await this.userService.findUserByEmail(payload.email);
        if(!user){
            throw new UnauthorizedException();
        }

        user.password = null;
        return user;
    }
}
