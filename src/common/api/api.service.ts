import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly config: ConfigService) {}

  async getDataDragon(version: string, type: string) {
    return await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/${type}.json`,
    );
  }

  private getUri(url: string, parameter: string = null) {
    return (
      this.config.get('api.base') +
      url +
      encodeURI(parameter) +
      `?api_key=${this.config.get('api.key')}`
    );
  }
}
