import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MatchBaseResolver } from './match-base.resolver';
import { MatchService } from './match.service';
import { MatchDetailModel } from './model/match-detail.model';
import { ParticipantModel } from '../participant/model/participant.model';
import { MatchDocument } from './schema/match.schema';
import { MatchIdArgs } from 'src/common/args/match-id.args';

@Resolver((of) => MatchDetailModel)
export class MatchDetailResolver extends MatchBaseResolver(MatchDetailModel) {
  constructor(private readonly matchService: MatchService) {
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

  @Query((returns) => MatchDetailModel)
  async matchDetail(@Args() { matchId }: MatchIdArgs) {
    const match = this.matchService.findByMatchId(matchId, null);

    return match;
  }
}
