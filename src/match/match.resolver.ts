import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MatchService } from './match.service';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation((returns) => String)
  async testUpdateMatch(@Args('matchId') matchId: string) {
    const matchResult = await this.matchService.getMatch(matchId);
    const parsed = this.matchService.parseMatch(matchResult.data);

    const result = await this.matchService.create(parsed);

    return 'test';
  }

  @Query((returns) => String)
  async getSummoner(@Args('matchId') matchId: string) {
    const result = await this.matchService.findByMatchId(matchId);
    return result.matchId;
  }
}
