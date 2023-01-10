import { IsNotEmpty } from "class-validator";
import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto{

    @ApiProperty({
        name:"email",
        type:String,
        required:true,
        description:"User's email to login"
    })
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        name:"password",
        type:String,
        required:true,
        description:"User's password to login"
    })
    @IsNotEmpty()
    @IsString()
    password:string;
}