import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataDragonDto } from './dto/data-dragon.dto';
import { DataDragon, DataDragonDocument } from './schema/data-dragon.schema';
import { DataDragonType } from './type/data-dragon.type';

@Injectable()
export class DataDragonService {
  constructor(
    @InjectModel(DataDragon.name)
    private readonly ddModel: Model<DataDragonDocument>,
  ) {}

  async getImagePath(type: DataDragonType, key: number | string) {
    const dataDragon = await this.ddModel.findOne({
      type,
    });

    const item = dataDragon.pathes.find(({ id }) => id === key.toString());

    return item ? dataDragon.base + item.path : '';
  }

  async create(dataDragonDto: DataDragonDto) {
    return await this.ddModel.create(dataDragonDto);
  }

  async delete(type: string) {
    return await this.ddModel.deleteOne({ type });
  }
}
