import { Schema } from "mongoose";
import { IUser } from "../interfaces/iuser";
import * as bcrypt from 'bcrypt';

export const userSchema = new Schema<IUser>({
    email:{type:String, unique:true, trim:true,required:true,lowercase:true},
    password:{type:String, unique:true, required:true}

}) 

userSchema.pre<IUser>('save',async function(){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password,salt);
    this.password=hash;
})