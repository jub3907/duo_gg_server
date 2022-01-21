import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ParticipantPerk {
  @Prop({ type: Types.Number })
  flex: number;

  @Prop({ type: Types.Number })
  defense: number;

  @Prop({ type: Types.Number })
  offense: number;

  @Prop({ type: Types.Number })
  primaryStyle: number;

  @Prop({ type: Types.Array })
  primarySelections: number[];

  @Prop({ type: Types.Number })
  subStyle: number;

  @Prop({ type: Types.Array })
  subSelections: number[];
}

export type ParticipantPerkDocument = ParticipantPerk & mongoose.Document;
export const ParticipantPerkSchema =
  SchemaFactory.createForClass(ParticipantPerk);
