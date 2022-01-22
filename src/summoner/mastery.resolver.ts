import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MasteryService } from './mastery.service';

@Resolver()
export class MasteryResolver {
  constructor(private readonly masteryService: MasteryService) {}

  @Mutation((returns) => String)
  async testUpdateMastery(@Args('summonerId') summonerId: string) {
    const apiResult = await this.masteryService.getMastery(summonerId);

    await this.masteryService.update(apiResult.data, summonerId);

    return 'test';
  }
}
