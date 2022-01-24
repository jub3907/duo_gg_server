import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api/api.service';
import { DataDragonDto } from './dto/data-dragon.dto';
import { DataDragon, DataDragonDocument } from './schema/data-dragon.schema';

@Injectable()
export class DataDragonService {
  constructor(
    @InjectModel(DataDragon.name)
    private readonly ddModel: Model<DataDragonDocument>,
  ) {}

  async getImagePath(type: string, key: number | string) {
    const dataDragon = await this.ddModel.findOne({
      type,
    });

    const item = dataDragon.pathes.find(({ id }) => id === key.toString());

    return item ? dataDragon.base + item.path : '';
  }

  parseItemAndIcon(data: JSON) {
    return Object.keys(data).map((id) => ({ id, path: data[id].image.full }));
  }

  parseSpellAndChampion(data: JSON) {
    return Object.keys(data).map((id) => ({
      id: data[id].key,
      path: data[id].image.full,
    }));
  }

  parseRune(data: Array<any>) {
    return data
      .map(({ id, icon, slots }) =>
        [{ id, path: icon }].concat(
          slots
            .map(({ runes }) =>
              runes.map(({ id, icon }) => ({ id, path: icon })).flat(),
            )
            .flat(),
        ),
      )
      .flat();
  }

  async create(dataDragonDto: DataDragonDto) {
    return await this.ddModel.create(dataDragonDto);
  }

  async delete(type: string) {
    return await this.ddModel.deleteOne({ type });
  }
}
