import { IsNotEmpty } from "class-validator";
import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto{

    @ApiProperty({
        name:"email",
        type:String,
        required:true,
        description:"User's email"
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        name:"password",
        type:String,
        required:true,
        description:"User's password"
    })
    @IsNotEmpty()
    @IsString()
    password:string;
}