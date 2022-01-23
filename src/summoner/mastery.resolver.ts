import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { MasteryService } from './mastery.service';
import { MasteryModel } from './model/mastery.model';

@Resolver((of) => MasteryModel)
export class MasteryResolver {
  constructor(
    private readonly masteryService: MasteryService,

    private readonly dataDragonService: DataDragonService,
  ) {}

  @ResolveField((returns) => String)
  iconPath(@Parent() mastery: MasteryModel) {
    return this.dataDragonService.getImagePath('champion', mastery.championId);
  }

  @Mutation((returns) => [MasteryModel])
  async mastery(@Args('summonerId') summonerId: string) {
    const apiResult = await this.masteryService.getMastery(summonerId);
    const slicedMastery = this.masteryService.sliceMastery(apiResult.data);
    console.log(slicedMastery);

    await this.masteryService.update(slicedMastery, summonerId);

    return slicedMastery;
  }
}
