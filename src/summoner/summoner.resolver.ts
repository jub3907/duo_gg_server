import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import axios from 'axios';
import { SummonerService } from './summoner.service';

@Resolver()
export class SummonerResolver {
  constructor(private readonly summonerService: SummonerService) {}

  // @Query((returns) => String)
  // async getSummoner(@Args('name') name: string) {
  //   const result = await this.summonerService.findByName(name);
  //   return result.name;
  // }
}
