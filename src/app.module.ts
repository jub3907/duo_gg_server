import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

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

    // GraphQLModule.forRoot({
    //   path: '/',
    //   autoSchemaFile: 'schema.gql',
    //   playground: process.env.NODE_ENV === 'development',
    //   debug: process.env.NODE_ENV === 'development',

    //   context: ({ req, res }) => ({ req, res }),
    //   sortSchema: true,
    // }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
