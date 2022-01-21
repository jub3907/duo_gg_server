import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment, CommentSchema } from 'src/summoner/schema/comment.schema';
import { Mastery, MasterySchema } from 'src/summoner/schema/mastery.schema';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'summoners',
})
export class Summoner {
  @Prop({ type: Types.String })
  accountId: string;

  @Prop({ type: Types.Number })
  profileIconId: number;

  @Prop({ type: Types.String })
  id: string;

  @Prop({ type: Types.String })
  puuid: string;

  @Prop({ type: Types.String })
  name: string;

  @Prop({ type: Types.Number })
  summonerLevel: number;

  @Prop({ type: CommentSchema, default: [] })
  comments: Comment[];

  @Prop({ type: MasterySchema, default: [] })
  masteries: Mastery[];
}

export type SummonerDocument = Summoner & mongoose.Document;
export const SummonerSchema = SchemaFactory.createForClass(Summoner);
