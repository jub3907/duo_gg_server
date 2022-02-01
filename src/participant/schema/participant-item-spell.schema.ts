import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DataDragonType } from 'src/data-dragon/type/data-dragon.type';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ParticipantItemSpell {
  @Prop({ type: Types.Number })
  index: number;

  @Prop({ type: Types.Number })
  id: number;

  @Prop({ type: Types.String })
  type: DataDragonType;
}

export type ParticipantItemSpellDocument = ParticipantItemSpell &
  mongoose.Document;
export const ParticipantItemSpellSchema =
  SchemaFactory.createForClass(ParticipantItemSpell);
