import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import e from 'express';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { ParticipantItemSpellModel } from './model/participant-item-spell.model';
import { ParticipantPerkModel } from './model/participant-perk.model';
import { ParticipantItemSpellDocument } from './schema/participant-item-spell.schema';
import { ParticipantPerkDocument } from './schema/participant-perk.schema';

@Resolver((of) => ParticipantPerkModel)
export class ParticipantPerkResolver {
  constructor(private readonly dataDragonService: DataDragonService) {}

  @ResolveField((returns) => String)
  primarySelections(@Parent() data: ParticipantPerkDocument) {
    return Promise.all(
      data.primarySelections.map(
        async (id) =>
          await this.dataDragonService.getImagePath('runesReforged', id),
      ),
    );
  }

  @ResolveField((returns) => String)
  primaryStyle(@Parent() data: ParticipantPerkDocument) {
    return this.dataDragonService.getImagePath(
      'runesReforged',
      data.primaryStyle,
    );
  }

  @ResolveField((returns) => String)
  subStyle(@Parent() data: ParticipantPerkDocument) {
    return this.dataDragonService.getImagePath('runesReforged', data.subStyle);
  }

  @ResolveField((returns) => String)
  subSelections(@Parent() data: ParticipantPerkDocument) {
    return Promise.all(
      data.subSelections.map(
        async (id) =>
          await this.dataDragonService.getImagePath('runesReforged', id),
      ),
    );
  }
}
