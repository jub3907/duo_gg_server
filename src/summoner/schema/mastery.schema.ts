import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Mastery {
  @Prop({ type: Types.String })
  championId: string;

  @Prop({ type: Types.Number })
  championLevel: number;

  @Prop({ type: Types.Number })
  championPoints: number;

  @Prop({ type: Types.Number })
  lastPlayTime: number;
}

export type MasteryDocument = Mastery & mongoose.Document;
export const MasterySchema = SchemaFactory.createForClass(Mastery);
