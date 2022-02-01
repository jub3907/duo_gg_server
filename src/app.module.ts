import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { SummonerModule } from './summoner/summoner.module';
import { CommonModule } from './common/common.module';
import { DataDragonModule } from './data-dragon/data-dragon.module';
import { MatchModule } from './match/match.module';
import { LeagueEntryModule } from './league-entry/league-entry.module';
import { TimelineModule } from './timeline/timeline.module';
import { PostModule } from './post/post.module';

const whitelist = [
  undefined,
  'http://localhost:3000',
  'http://112.171.82.107:3000/',
  'http://112.171.82.107:5000/',
  'http://3.36.31.37:5000',
];

const corsOrigin = function (origin: any, callback: any) {
  if (
    whitelist.indexOf(origin) !== -1 ||
    process.env.NODE_ENV === 'development'
  ) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
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
      path: '/graphql',
      autoSchemaFile: 'schema.gql',
      playground: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',

      cors: {
        origin: corsOrigin,
        allowedHeaders:
          'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
      },

      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,

      formatError: (error) => {
        // 서버 오류의 메세지를 extension - detail로 저장하고
        // error의 메세지는 사용자에세 보여질 수 있으므로 대체함.
        error.extensions.detail = error.message;
        error.message = '서버 오류가 발생했어요. 다시 시도해주세요.';

        return error;
      },
    }),

    SummonerModule,
    CommonModule,
    DataDragonModule,
    MatchModule,
    LeagueEntryModule,
    TimelineModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
