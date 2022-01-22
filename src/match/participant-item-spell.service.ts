import { Injectable } from '@nestjs/common';
import { ParticipantItemSpellDto } from './dto/participant-item-spell.dto';

@Injectable()
export class ParticipantItemSpellService {
  parseItem(participant: JSON): ParticipantItemSpellDto[] {
    return [...Array(7).keys()].map((index) => ({
      index,
      id: participant[`item${index}`],
    }));
  }

  parseSpell(participant: JSON): ParticipantItemSpellDto[] {
    return [...Array(2).keys()].map((index) => ({
      index,
      id: participant[`summoner${index + 1}Id`],
    }));
  }
}
