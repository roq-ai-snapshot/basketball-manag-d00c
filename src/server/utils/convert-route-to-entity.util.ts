const mapping: Record<string, string> = {
  'draft-picks': 'draft_pick',
  players: 'player',
  'player-stats': 'player_stat',
  'sports-teams': 'sports_team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
