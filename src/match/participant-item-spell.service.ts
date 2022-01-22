import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantItemSpellService {
  parseItem(participant: JSON) {
    return [...Array(7).keys()].map((index) => ({
      index,
      id: participant[`item${index}`],
    }));
  }

  parseSpell(participant: JSON) {
    return [...Array(2).keys()].map((index) => ({
      index,
      id: participant[`summoner${index + 1}Id`],
    }));
  }
}
