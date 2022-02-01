import { Type } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MatchDocument } from './schema/match.schema';

export function MatchBaseResolver<T extends Type<unknown>>(model: T): any {
  @Resolver((of) => model, { isAbstract: true })
  abstract class MatchBase {
    @ResolveField((returns) => String)
    matchType(@Parent() match: MatchDocument) {
      return match.queueId === 420
        ? '솔로 랭크'
        : match.queueId === 430
        ? '일반 게임'
        : match.queueId === 440
        ? '자유 5:5 랭크'
        : match.queueId === 450
        ? '무작위 총력전'
        : match.queueId === 1400
        ? '궁극기 주문서'
        : '기타';
    }
  }

  return MatchBase;
}
