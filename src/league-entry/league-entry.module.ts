import { Module } from '@nestjs/common';
import { LeagueEntryService } from './league-entry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueEntry, LeagueEntrySchema } from './schema/league-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: LeagueEntry.name, useFactory: () => LeagueEntrySchema },
    ]),
  ],
  providers: [LeagueEntryService],
  exports: [LeagueEntryService],
})
export class LeagueEntryModule {}
