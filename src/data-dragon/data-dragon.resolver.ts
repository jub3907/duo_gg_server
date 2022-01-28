import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { create } from 'domain';
import { ApiService } from 'src/common/api.service';
import { DataDragonService } from './data-dragon.service';
import { VersionArgs } from './dto/version.args';

@Resolver((of) => Boolean)
export class DataDragonResolver {
  constructor(
    private readonly api: ApiService,
    private readonly ddService: DataDragonService,
  ) {}

  @Mutation((returns) => Boolean)
  async updateItemData(@Args() { version }: VersionArgs) {
    const pathList = await this.api.getDataDragonPathList(version, 'item');

    await this.ddService.delete('item');

    const result = await this.ddService.create({
      type: 'item',
      base: 'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/item/',
      pathes: pathList,
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateIconData(@Args() { version }: VersionArgs) {
    const pathList = await this.api.getDataDragonPathList(
      version,
      'profileicon',
    );

    await this.ddService.delete('profileicon');

    const result = await this.ddService.create({
      type: 'profileicon',
      base: 'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/',
      pathes: pathList,
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateSummonerData(@Args() { version }: VersionArgs) {
    const pathList = await this.api.getDataDragonPathList(version, 'summoner');

    await this.ddService.delete('summoner');

    const result = await this.ddService.create({
      type: 'summoner',
      base: 'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/spell/',
      pathes: pathList,
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateChampionData(@Args() { version }: VersionArgs) {
    const pathList = await this.api.getDataDragonPathList(version, 'champion');

    await this.ddService.delete('champion');

    const result = await this.ddService.create({
      type: 'champion',
      base: 'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/',
      pathes: pathList,
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRuneData(@Args() { version }: VersionArgs) {
    const pathList = await this.api.getDataDragonPathList(
      version,
      'runesReforged',
    );

    await this.ddService.delete('runes');

    const result = await this.ddService.create({
      type: 'runesReforged',
      base: 'http://ddragon.leagueoflegends.com/cdn/img/',
      pathes: pathList,
    });

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
