import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/iuser';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel:Model<IUser>
    ){
        this.populateUsers();
    }

    async populateUsers(){
        const users:UserDto[] = [
            {email:"rosa@gmail.com",password:"rosa"},
            {email:"jose@gmail.com",password:"jose"},
            {email:"paola@gmail.com",password:"paola"}
        ]

        for (const user of users) {
            const userExists = await this.findUserByEmail(user.email);
            if(!userExists){
                await this.createUser(user);
            }           
            
        }
    }

    async getUsers(){
        return this.userModel.find({},{password:0})
    }

    async createUser(user:UserDto){
        const userExists = await this.findUserByEmail(user.email);
        if(userExists === null){
            const newUser = new this.userModel(user);
            await newUser.save();
            newUser.password=null;
            return newUser
        }
        throw new ConflictException("email already exists");
    }

    findUserByEmail(email:string){
        return this.userModel.findOne({email:email.toLowerCase()});

    }
}
