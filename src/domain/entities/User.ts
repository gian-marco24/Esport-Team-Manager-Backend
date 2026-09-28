export type UserRole = 'player' | 'coach' | 'analyst' | 'manager' | 'staff';

export interface UserStats {
  kda: string;
  winrate: number;
  matchesPlayed: number;
  hsPercentage: number;
  mvpCount: number;
  mainAgentOrHero: string;
}

export interface UserEntity {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  teamId: string;
  teamName: string;
  position?: string;
  stats: UserStats;
  createdAt: string;
}
