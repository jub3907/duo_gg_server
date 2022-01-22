export const ApiObject = {
  summonerByName: 'lol/summoner/v4/summoners/by-name/',
  entriesById: 'lol/league/v4/entries/by-summoner/',
  challengersByQueue: 'lol/league/v4/challengerleagues/by-queue/',
  masteryById: 'lol/champion-mastery/v4/champion-masteries/by-summoner/',
  matchBymatchId: 'lol/match/v5/matches/',
  matchesByPuuid: 'lol/match/v5/matches/by-puuid/',
  timelineBymatchId: 'lol/match/v5/matches/',
} as const;

export type ApiType = keyof typeof ApiObject;
