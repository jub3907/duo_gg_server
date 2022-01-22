import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import axios from 'axios';
import { SummonerService } from './summoner.service';

@Resolver()
export class SummonerResolver {
  constructor(private readonly summonerService: SummonerService) {}

  /**
   *   test용 코드
   * */
  @Mutation((returns) => String)
  async testUpdateSummoner(@Args('name') name: string) {
    const apiResult = await this.summonerService.getSummoner(name);

    await this.summonerService.create(apiResult.data);

    return 'test';
  }

  @Query((returns) => String)
  async getSummoner(@Args('name') name: string) {
    const result = await this.summonerService.findByName(name);
    return result.name;
  }
}
