import { UserCreation } from './creationsService';

export interface ExpSummary {
  totalCreations: number;
  totalExp: number;
  currentLevel: number;
  levelTitle: string;
  nextLevelExp: number;
  expInCurrentLevel: number;
  progressPercent: number;
}

export const getLevelTitle = (level: number): string => {
  if (level <= 1) return 'Pemula Kreatif';
  if (level === 2) return 'Tukang Bikin';
  if (level === 3) return 'Kreator Terampil';
  return 'Master Daur Ulang';
};

export const calculateExpSummary = (creations: UserCreation[]): ExpSummary => {
  const totalCreations = creations.length;
  const totalExp = creations.reduce((sum, item) => sum + (item.exp_earned || 0), 0);
  const currentLevel = Math.max(1, Math.floor(totalExp / 100) + 1);
  const nextLevelExp = currentLevel * 100;
  const expInCurrentLevel = totalExp % 100;
  const progressPercent = Math.min(100, Math.round((expInCurrentLevel / 100) * 100));

  return {
    totalCreations,
    totalExp,
    currentLevel,
    levelTitle: getLevelTitle(currentLevel),
    nextLevelExp,
    expInCurrentLevel,
    progressPercent,
  };
};