import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TimelineItemModel {
  @Field((type) => Number)
  timestamp: number;

  @Field((type) => String)
  iconPath: string;
}
