import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ApiObject, ApiType } from './type/api.type';

@Injectable()
export class ApiService {
  constructor(private readonly config: ConfigService) {}

  async getDataDragon(version: string, type: string) {
    return await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/${type}.json`,
    );
  }

  async getApiResult(type: ApiType, variable: string, params: any = {}) {
    return await axios.get(this.getUri(type, variable), {
      params: {
        ...params,
        api_key: this.config.get('api.key'),
      },
    });
  }

  private getUri(type: ApiType, variable: string) {
    return ApiObject[type].path + encodeURI(variable) + ApiObject[type].behind;
  }
}
