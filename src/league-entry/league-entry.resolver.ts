import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LeagueEntryService } from './league-entry.service';
import { LeagueEntryModel } from './model/league-entry.model';

@Resolver((of) => LeagueEntryModel)
export class LeagueEntryResolver {
  constructor(private readonly leagueEntryService: LeagueEntryService) {}
}
