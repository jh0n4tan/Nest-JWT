import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './strategy/jwt-strategy/jwt-strategy.service';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      useFactory:(ConfigService:ConfigService) =>{
        return {
          secret: ConfigService.get('auth.secret_key'),
          signOptions: {expiresIn:'60s'}
        }
      },
      inject:[ConfigService]
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategyService
  ]
})
export class AuthModule {}
