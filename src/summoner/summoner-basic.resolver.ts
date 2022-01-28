import {
  Args,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ApiService } from 'src/common/api.service';
import { NameArgs } from 'src/common/args/name.args';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { LeagueEntryService } from 'src/league-entry/league-entry.service';
import { SummonerBasicModel } from './model/summoner-basic.model';
import { SummonerEntryModel } from './model/summoner-entry.model';
import { SummonerDocument } from './schema/summoner.schema';
import { SummonerService } from './summoner.service';

@Resolver((of) => SummonerBasicModel)
export class SummonerBasicResolver {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly leagueEntryService: LeagueEntryService,
    private readonly dataDragonService: DataDragonService,
    private readonly api: ApiService,
  ) {}

  @ResolveField((returns) => String)
  iconPath(@Parent() summoner: SummonerDocument) {
    return this.dataDragonService.getImagePath(
      'profileicon',
      summoner.profileIconId,
    );
  }

  @ResolveField((returns) => SummonerEntryModel)
  async soleRank(@Parent() summoner: SummonerDocument) {
    return await this.leagueEntryService.findEntryByType(
      summoner.id,
      'RANKED_SOLO_5x5',
    );
  }

  @ResolveField((returns) => SummonerEntryModel)
  async freeRank(@Parent() summoner: SummonerDocument) {
    return await this.leagueEntryService.findEntryByType(
      summoner.id,
      'RANKED_FLEX_SR',
    );
  }

  @Mutation((returns) => SummonerBasicModel)
  async basicSummonerInfo(@Args() { name }: NameArgs) {
    const result = await this.api.getSummoner(name);
    const summoner = await this.summonerService.updateSummoner(result);

    const entries = await this.api.getEntries(summoner.id);
    await this.leagueEntryService.updateEntries(entries);

    return summoner;
  }

  @Mutation((returns) => [SummonerBasicModel])
  async ranking() {
    const challengerEntries = await this.api.getChallengerEntries();
    const rankerEntries =
      this.leagueEntryService.sliceEntries(challengerEntries);
    await this.leagueEntryService.updateEntries(rankerEntries);

    const rankerNames = this.leagueEntryService.filterName(rankerEntries);
    const rankerSummoners = await this.api.getSummoners(rankerNames);

    await this.summonerService.updateSummoners(rankerSummoners);

    return rankerSummoners;
  }
}
