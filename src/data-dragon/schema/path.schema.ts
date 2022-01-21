import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class DataDragonPath {
  @Prop({ type: Types.String })
  id: string;

  @Prop({ type: Types.String })
  path: string;
}

export type DataDragonPathDocument = DataDragonPath & mongoose.Document;
export const DataDragonPathSchema =
  SchemaFactory.createForClass(DataDragonPath);
