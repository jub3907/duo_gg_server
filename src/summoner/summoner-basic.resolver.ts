import { ConfigService } from '@nestjs/config';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import axios from 'axios';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { LeagueEntryService } from 'src/league-entry/league-entry.service';
import { SummonerBasicModel } from './model/summoner-basic.model';
import { SummonerEntryModel } from './model/summoner-entry.model';
import { SummonerService } from './summoner.service';

@Resolver((of) => SummonerBasicModel)
export class SummonerBasicResolver {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly leagueEntryService: LeagueEntryService,
    private readonly dataDragonService: DataDragonService,
  ) {}

  @ResolveField((returns) => String)
  iconPath(@Parent() summoner: SummonerBasicModel) {
    return this.dataDragonService.getImagePath(
      'profileicon',
      summoner.profileIconId,
    );
  }

  @ResolveField((returns) => SummonerEntryModel)
  async soleRank(@Parent() summoner: SummonerBasicModel) {
    return await this.leagueEntryService.getEntryByType(
      summoner.id,
      'RANKED_SOLO_5x5',
    );
  }

  @ResolveField((returns) => SummonerEntryModel)
  async freeRank(@Parent() summoner: SummonerBasicModel) {
    return await this.leagueEntryService.getEntryByType(
      summoner.id,
      'RANKED_FLEX_SR',
    );
  }

  @Mutation((returns) => SummonerBasicModel)
  async basicSummonerInfo(@Args('name') name: string) {
    const apiResult = await this.summonerService.getSummoner(name);

    await this.summonerService.updateSummoner(
      apiResult.data['accountId'],
      apiResult.data,
    );

    return apiResult.data;
  }
}
