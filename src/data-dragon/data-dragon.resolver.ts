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
    const data = await this.api.getDataDragon(this.version, 'item');
    const pathList = this.ddService.parseItemAndIcon(data.data.data);

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
    const data = await this.api.getDataDragon(this.version, 'profileicon');
    const pathList = this.ddService.parseItemAndIcon(data.data.data);

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
    const data = await this.api.getDataDragon(this.version, 'summoner');
    const pathList = this.ddService.parseSpellAndChampion(data.data.data);

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
    const data = await this.api.getDataDragon(this.version, 'champion');

    const pathList = this.ddService.parseSpellAndChampion(data.data.data);

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
    const data = await this.api.getDataDragon(this.version, 'runesReforged');

    const pathList = this.ddService.parseRune(data.data);

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
