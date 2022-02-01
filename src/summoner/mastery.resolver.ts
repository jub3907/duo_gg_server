import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApiService } from 'src/common/api.service';
import { CountArgs } from 'src/common/args/match-count.args';
import { SummonerIdArgs } from 'src/common/args/summoner-id.args';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { MasteryService } from './mastery.service';
import { MasteryModel } from './model/mastery.model';

@Resolver((of) => MasteryModel)
export class MasteryResolver {
  constructor(
    private readonly masteryService: MasteryService,
    private readonly api: ApiService,
    private readonly dataDragonService: DataDragonService,
  ) {}

  @ResolveField((returns) => String)
  iconPath(@Parent() mastery: MasteryModel) {
    return this.dataDragonService.getImagePath('champion', mastery.championId);
  }

  @Query((returns) => [MasteryModel])
  async mastery(
    @Args() { summonerId }: SummonerIdArgs,
    @Args() { count }: CountArgs,
  ) {
    const masteries = await this.api.getMastery(summonerId);
    return this.masteryService.sliceMastery(masteries, count);
  }
}
