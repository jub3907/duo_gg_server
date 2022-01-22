export class LeagueEntryDto {
  summonerId: string;
  summonerName: string;
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR';
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  createdAt: number;
  updatedAt: number;
}
