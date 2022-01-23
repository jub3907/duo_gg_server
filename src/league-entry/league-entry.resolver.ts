import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LeagueEntryService } from './league-entry.service';
import { LeagueEntryModel } from './model/league-entry.model';

@Resolver((of) => LeagueEntryModel)
export class LeagueEntryResolver {
  constructor(private readonly leagueEntryService: LeagueEntryService) {}

  // @ResolveField()
  // @Mutation((returns) => String)
  // async testUpdateEntries(@Args('summonerId') summonerId: string) {
  //   const apiResult = await this.leagueEntryService.getEntries(summonerId);

  //   await this.leagueEntryService.delete(summonerId);
  //   await this.leagueEntryService.create(apiResult.data);
  //   return 'test';
  // }

  // @Mutation((returns) => String)
  // async testChallengerEntries() {
  //   const apiResult = await this.leagueEntryService.getChallengerEntries();

  //   console.log(apiResult.data);
  //   return 'test';
  // }
}
