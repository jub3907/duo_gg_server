import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { extend } from '@nestjs/graphql/dist/utils';
import { SummonerService } from 'src/summoner/summoner.service';
import { MatchBaseResolver } from './match-base.resolver';
import { MatchService } from './match.service';
import { MatchDetailModel } from './model/match-detail.model';
import { MatchDocument } from './schema/match.schema';

@Resolver((of) => MatchDetailModel)
export class MatchDetailResolver extends MatchBaseResolver(MatchDetailModel) {
  constructor(
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
  ) {
    super();
  }

  @ResolveField((returns) => Number)
  @Mutation((returns) => MatchDetailModel)
  async matchDetail(@Args('matchId') matchId: string) {
    const match = this.matchService.findByMatchId(matchId, null);

    console.log(match);
    return match;
  }
}
