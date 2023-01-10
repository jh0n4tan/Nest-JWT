import { Controller,Post,Body,Get,Request,UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.credentials.dto';
import { AuthGuard } from '@nestjs/passport'


@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/login')
    @ApiOperation({
        description:"It'll Log us into the application"
    })
    @ApiBody({
        description:"Log ih with user and password",
        type:AuthDto,
        examples:{
            example:{
                value:{
                    email:"rosa@gmail.com",
                    password:"rosa"
                }
            }
        }
    })
    @ApiResponse({
        status:401,
        description:"invalid credentials"
    })
    login(@Body() authCredentials:AuthDto){
        return this.authService.login(authCredentials);
    }

    @Get('data-user')    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth("jwt")
    @ApiOperation({
        description:"It returns the user's logged data"
    })
    @ApiResponse({
        status:401,
        description:"unauthorized"
    })
    dataUser(@Request() req){
        return req.user;
    }
}
