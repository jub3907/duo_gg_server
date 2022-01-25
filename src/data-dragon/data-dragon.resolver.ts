import { Mutation, Resolver } from '@nestjs/graphql';
import { create } from 'domain';
import { ApiService } from 'src/common/api.service';
import { DataDragonService } from './data-dragon.service';

@Resolver((of) => Boolean)
export class DataDragonResolver {
  version: string;
  constructor(
    private readonly api: ApiService,
    private readonly ddService: DataDragonService,
  ) {
    this.version = '12.1.1';
  }

  @Mutation((returns) => Boolean)
  async updateItemData() {
    const pathList = await this.api.getDataDragonPathList(this.version, 'item');

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
  async updateIconData() {
    const pathList = await this.api.getDataDragonPathList(
      this.version,
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
  async updateSummonerData() {
    const pathList = await this.api.getDataDragonPathList(
      this.version,
      'summoner',
    );

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
  async updateChampionData() {
    const pathList = await this.api.getDataDragonPathList(
      this.version,
      'champion',
    );

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
  async updateRuneData() {
    const pathList = await this.api.getDataDragonPathList(
      this.version,
      'runesReforged',
    );

    await this.ddService.delete('runes');

    const result = await this.ddService.create({
      type: 'runes',
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
