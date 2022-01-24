import { Injectable } from '@nestjs/common';
import { ParticipantPerkDto } from './dto/participant-perk.dto';

@Injectable()
export class ParticipantPerkService {
  parsePerks(perks: JSON): ParticipantPerkDto {
    return {
      flex: perks['statPerks']['flex'],
      defense: perks['statPerks']['defense'],
      offense: perks['statPerks']['offense'],
      primaryStyle: perks['styles'][0]['style'],
      primarySelections: perks['styles'][0]['selections'].map(
        ({ perk }) => perk,
      ),
      subStyle: perks['styles'][1]['style'],
      subSelections: perks['styles'][1]['selections'].map(({ perk }) => perk),
    };
  }
}
