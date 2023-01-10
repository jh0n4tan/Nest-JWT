import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationMongo from './conf/conf.mongo';
import configurationAuth from './conf/conf.auth';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configurationMongo,configurationAuth],
      envFilePath:`./env/${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    UsersModule,
    AuthModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
