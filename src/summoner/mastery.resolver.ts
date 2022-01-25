import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApiService } from 'src/common/api.service';
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

  @Mutation((returns) => [MasteryModel])
  async mastery(@Args('summonerId') summonerId: string) {
    const masteries = await this.api.getMastery(summonerId);
    const sliced = this.masteryService.sliceMastery(masteries);

    await this.masteryService.update(sliced, summonerId);

    return sliced;
  }
}
