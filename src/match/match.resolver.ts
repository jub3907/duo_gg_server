import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SummonerService } from 'src/summoner/summoner.service';
import { MatchService } from './match.service';
import { MatchModel } from './model/match.model';

@Resolver((of) => MatchModel)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
  ) {}

  @Mutation((returns) => String)
  async testUpdateMatch(@Args('matchId') matchId: string) {
    const matchResult = await this.matchService.getMatch(matchId);
    const parsed = this.matchService.parseMatch(matchResult.data);

    const result = await this.matchService.create(parsed);

    return 'test';
  }

  @Mutation((returns) => String)
  async testGetMatchIds(@Args('puuid') puuid: string) {
    const matchIdsResult = await this.matchService.getMatchIdsByPuuid({
      puuid,
      type: 'ranked',
      count: 100,
    });
    return 'test';
  }

  @Mutation((returns) => [MatchModel])
  async recentMatches(@Args('name') name: string) {
    const summoner = (await this.summonerService.isExistName(name))
      ? await this.summonerService.findByName(name, 'puuid')
      : await this.summonerService.getSummoner(name);

    const matchIdsApiResult = await this.matchService.getMatchIdsByPuuid({
      puuid: summoner['puuid'],
      count: 20,
    });

    const matches = await this.matchService.getMatchesByIds(
      matchIdsApiResult.data,
    );

    await this.matchService.updateMatches(matches);

    return matches;
  }
}
