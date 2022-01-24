import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import e from 'express';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { ParticipantItemSpellModel } from './model/participant-item-spell.model';
import { ParticipantItemSpellDocument } from './schema/participant-item-spell.schema';

@Resolver((of) => ParticipantItemSpellModel)
export class ParticipantItemSpellResolver {
  constructor(private readonly dataDragonService: DataDragonService) {}

  @ResolveField((returns) => String)
  iconPath(@Parent() data: ParticipantItemSpellDocument) {
    if (data.id === 0) {
      return '';
    } else {
      return this.dataDragonService.getImagePath(data.type, data.id);
    }
  }
}
