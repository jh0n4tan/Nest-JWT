import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common';
import { Connection,createConnection } from 'mongoose';

@Injectable()
export class MongoConnectionService {
    private dbConnection:Connection;
    constructor(private configService:ConfigService){
        this.createConnectionDB();
    }

    async createConnectionDB(){

        const host =this.configService.get("mongo.host");
        //const port =this.configService.get("mongo.port");
        const user =this.configService.get("mongo.user");
        const password =this.configService.get("mongo.password");
        const database =this.configService.get("mongo.database");

        const mongoUri=`mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;
        
        this.dbConnection = createConnection(mongoUri);

        this.dbConnection.once('open',()=>{
            console.log('Connected to MongoDB Atlas');            
        })

        this.dbConnection.once('error',()=>{
            console.log('there was an error');            
        })
    }

    getConnection():Connection{
        return this.dbConnection;
    }    
}
