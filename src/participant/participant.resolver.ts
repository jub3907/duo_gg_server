import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { SummonerService } from 'src/summoner/summoner.service';
import { MatchService } from '../match/match.service';
import { ParticipantModel } from './model/participant.model';
import { ParticipantDocument } from './schema/participant.schema';

@Resolver((of) => ParticipantModel)
export class ParticipantResolver {
  constructor(private readonly dataDragonService: DataDragonService) {}

  @ResolveField((returns) => String)
  championIconPath(@Parent() participant: ParticipantDocument) {
    return this.dataDragonService.getImagePath(
      'champion',
      participant.championId,
    );
  }
}
