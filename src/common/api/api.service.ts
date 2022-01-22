import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ApiObject, ApiType } from './api.type';

@Injectable()
export class ApiService {
  constructor(private readonly config: ConfigService) {}

  async getDataDragon(version: string, type: string) {
    return await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/${type}.json`,
    );
  }

  async getApiResult(type: ApiType, parameter: string = '') {
    return await axios.get(this.getUri(type, parameter));
  }

  private getUri(type: ApiType, parameter: string) {
    return (
      ApiObject[type].path +
      encodeURI(parameter) +
      '?api_key=' +
      this.config.get('api.key') +
      ApiObject[type].behind
    );
  }
}
