export const ApiObject = {
  summonerByName: {
    path: 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/',
    behind: '',
  },
  entriesById: {
    path: 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/',
    behind: '',
  },
  challengersByQueue: {
    path: 'https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/',
    behind: '',
  },
  masteryById: {
    path: 'https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/',
    behind: '',
  },
  matchBymatchId: {
    path: 'https://asia.api.riotgames.com/lol/match/v5/matches/',
    behind: '',
  },
  matchesByPuuid: {
    path: 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/',
    behind: '/ids',
  },
  timelineBymatchId: {
    path: 'https://asia.api.riotgames.com/lol/match/v5/matches/',
    behind: '/timeline',
  },
  summonerById: {
    path: 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/',
    behind: '',
  },
} as const;

export type ApiType = keyof typeof ApiObject;
