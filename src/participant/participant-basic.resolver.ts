import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { ParticipantBasicModel } from './model/participant-basic.model';
import { ParticipantDocument } from './schema/participant.schema';

@Resolver((of) => ParticipantBasicModel)
export class ParticipantBasicResolver {
  constructor(private readonly dataDragonService: DataDragonService) {}

  @ResolveField((returns) => String)
  championIconPath(@Parent() participant: ParticipantDocument) {
    return this.dataDragonService.getImagePath(
      'champion',
      participant.championId,
    );
  }
}
