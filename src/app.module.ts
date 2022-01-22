import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SummonerResolver } from './summoner/summoner.resolver';
import { SummonerService } from './summoner/summoner.service';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { SummonerModule } from './summoner/summoner.module';
import { CommonModule } from './common/common.module';
import { DataDragonResolver } from './data-dragon/data-dragon.resolver';
import { DataDragonService } from './data-dragon/data-dragon.service';
import { DataDragonModule } from './data-dragon/data-dragon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get('db'),
        };
      },
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot({
      path: '/',
      autoSchemaFile: 'schema.gql',
      playground: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',

      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
    }),

    SummonerModule,
    CommonModule,
    DataDragonModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
