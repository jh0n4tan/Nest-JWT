import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth("jwt")
    @ApiOperation({
        description:"It returns all the users"
    })
    @ApiResponse({
        status:401,
        description:"unauthorized"
    })
    @ApiResponse({
        status:200,
        description:"It returns all the users"
    })
    getUsers(){
        return this.userService.getUsers();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth("jwt")
    @ApiOperation({
        description:"It creates a user"
    })
    @ApiResponse({
        status:401,
        description:"unauthorized"
    })
    @ApiResponse({
        status:409,
        description:"user already exists"
    })
    @ApiResponse({
        status:201,
        description:"user has been created"
    })
    @ApiBody({
        description:"It creates a user using UserDto",
        type:UserDto,
        examples:{
            sample1:{
                value:{
                    email:"rosa@gmail.com",
                    password:"rosa"
                }
            }
        }
    })
    createUser(@Body() user:UserDto){
        return this.userService.createUser(user);
    }
}
