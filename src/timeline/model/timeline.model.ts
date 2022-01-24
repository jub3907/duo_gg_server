import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { TimelineItemModel } from './timeline-item.model';

@ObjectType()
export class TimelineModel {
  @Field((type) => [TimelineItemModel])
  items: TimelineItemModel[];

  @Field((type) => [Number])
  skills: number[];
}
