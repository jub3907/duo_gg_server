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
    try {
      const result = await this.api.getSummoner(name);
      if (!result) {
        throw new Error('not exist');
      }
      const summoner = await this.summonerService.updateSummoner(result);

      const entries = await this.api.getEntries(summoner.id);
      await this.leagueEntryService.updateEntries(entries);

      return summoner;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @Mutation((returns) => [SummonerBasicModel])
  async ranking() {
    try {
      const challengerEntries = await this.api.getChallengerEntries();
      const rankerEntries =
        this.leagueEntryService.sliceEntries(challengerEntries);
      await this.leagueEntryService.updateEntries(rankerEntries);

      const rankerIds = this.leagueEntryService.filterId(rankerEntries);
      const rankerSummoners = await this.api.getSummonersById(rankerIds);
      const rankers = await this.summonerService.updateSummoners(
        rankerSummoners,
      );

      return rankers;
    } catch (e) {
      console.log(e);
      throw new Error('랭킹 정보를 받아오는데 실패했습니다.');
    }
  }
}
