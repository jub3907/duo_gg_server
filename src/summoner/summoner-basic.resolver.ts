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
    return await this.leagueEntryService.findEntryByType(
      summoner.id,
      'RANKED_SOLO_5x5',
    );
  }

  @ResolveField((returns) => SummonerEntryModel)
  async freeRank(@Parent() summoner: SummonerBasicModel) {
    return await this.leagueEntryService.findEntryByType(
      summoner.id,
      'RANKED_FLEX_SR',
    );
  }

  @Mutation((returns) => SummonerBasicModel)
  async basicSummonerInfo(@Args('name') name: string) {
    const apiResult = await this.summonerService.getSummoner(name);

    await this.summonerService.updateSummoner(apiResult.data);

    const EntryApiResult = await this.leagueEntryService.getEntries(
      apiResult.data.id,
    );
    const entries = this.leagueEntryService.parseEntries(EntryApiResult.data);
    await this.leagueEntryService.updateEntries(entries);

    return apiResult.data;
  }

  @Mutation((returns) => [SummonerBasicModel])
  async ranking() {
    const apiResult = await this.leagueEntryService.getChallengerEntries();
    const parsed = this.leagueEntryService.parseChallengerEntries(
      apiResult.data,
    );
    const rankerEntries = this.leagueEntryService.sliceEntries(parsed);
    await this.leagueEntryService.updateEntries(rankerEntries);

    const rankerNames = this.leagueEntryService.filterName(rankerEntries);
    const rankerSummoners = await this.summonerService.getSummoners(
      rankerNames,
    );

    await this.summonerService.updateSummoners(rankerSummoners);

    return rankerSummoners;
  }
}
