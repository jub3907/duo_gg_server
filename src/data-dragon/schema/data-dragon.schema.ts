import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DataDragonPath, DataDragonPathSchema } from './path.schema';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'dataDragons',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class DataDragon {
  @Prop({ type: Types.String })
  type: string;

  @Prop({ type: Types.String })
  base: string;

  @Prop([{ type: DataDragonPathSchema }])
  pathes: DataDragonPath[];
}

export type DataDragonDocument = DataDragon & mongoose.Document;
export const DataDragonSchema = SchemaFactory.createForClass(DataDragon);
