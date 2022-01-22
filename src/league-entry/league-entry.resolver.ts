import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LeagueEntryService } from './league-entry.service';

@Resolver()
export class LeagueEntryResolver {
  constructor(private readonly leagueEntryService: LeagueEntryService) {}

  @Mutation((returns) => String)
  async testUpdateEntries(@Args('summonerId') summonerId: string) {
    const apiResult = await this.leagueEntryService.getEntries(summonerId);

    await this.leagueEntryService.delete(summonerId);
    await this.leagueEntryService.create(apiResult.data);
    return 'test';
  }
}
