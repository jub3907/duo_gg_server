import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { match } from 'assert';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { SummonerService } from 'src/summoner/summoner.service';
import { ParticipantDto } from '../participant/dto/participant.dto';
import { MatchBaseResolver } from './match-base.resolver';
import { MatchService } from './match.service';
import { MatchBasicModel } from './model/match-basic.model';
import { ParticipantModel } from '../participant/model/participant.model';
import { ParticipantService } from '../participant/participant.service';
import { MatchDocument } from './schema/match.schema';
import { ParticipantDocument } from '../participant/schema/participant.schema';

@Resolver((of) => MatchBasicModel)
export class MatchBasicResolver extends MatchBaseResolver(MatchBasicModel) {
  constructor(
    private readonly dataDragonService: DataDragonService,
    private readonly matchService: MatchService,
    private readonly summonerService: SummonerService,
    private readonly participantService: ParticipantService,
  ) {
    super();
  }

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

  @ResolveField((returns) => ParticipantDto)
  summonerInGameData(@Parent() match: MatchBasicModel) {
    return match.participants.find(({ puuid }) => puuid === match.puuid);
  }

  @Mutation((returns) => [MatchBasicModel])
  async recentMatches(@Args('name') name: string) {
    const summoner = (await this.summonerService.isExistName(name))
      ? await this.summonerService.findByName(name, 'puuid')
      : await this.summonerService.getSummoner(name);

    const matchIdsApiResult = await this.matchService.getMatchIdsByPuuid({
      puuid: summoner['puuid'],
      count: 20,
    });

    const matches = await this.matchService.getMatchesByIds(
      matchIdsApiResult.data,
    );

    await this.matchService.updateMatches(matches);

    return matches.map((match) =>
      Object.assign(match, { puuid: summoner['puuid'] }),
    );
  }
}
