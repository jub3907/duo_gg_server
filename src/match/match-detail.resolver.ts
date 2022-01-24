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
import { ParticipantDto } from '../participant/dto/participant.dto';
import { MatchBaseResolver } from './match-base.resolver';
import { MatchService } from './match.service';
import { MatchDetailModel } from './model/match-detail.model';
import { ParticipantModel } from '../participant/model/participant.model';
import { MatchDocument } from './schema/match.schema';

@Resolver((of) => MatchDetailModel)
export class MatchDetailResolver extends MatchBaseResolver(MatchDetailModel) {
  constructor(
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
  ) {
    super();
  }

  @ResolveField((returns) => [ParticipantModel])
  red(@Parent() match: MatchDocument) {
    return match.participants.filter(
      (participant) => participant.teamId === 200,
    );
  }

  @ResolveField((returns) => [ParticipantModel])
  blue(@Parent() match: MatchDocument) {
    return match.participants.filter(
      (participant) => participant.teamId === 100,
    );
  }

  @Mutation((returns) => MatchDetailModel)
  async matchDetail(@Args('matchId') matchId: string) {
    const match = this.matchService.findByMatchId(matchId, null);

    return match;
  }
}
