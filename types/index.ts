export type CategoryType = 'all' | 'strength' | 'cardio' | 'yoga' | 'mobility';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

export interface Workout {
  id: string;
  title: string;
  category: CategoryType;
  durationMinutes: number;
  caloriesBurned: number;
  exercisesCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  featured?: boolean;
}

export interface UserProfile {
  name: string;
  initials: string;
  memberSince: string;
  totalWorkouts: number;
  streakDays: number;
  achievementsCount: number;
  dailyGoalPercent: number;
  steps: number;
  stepsTarget: number;
  calories: number;
  caloriesTarget: number;
  waterLiters: number;
  waterTargetLiters: number;
}

export interface ActivityPoint {
  label: string;
  heightPercent: number;
  isToday?: boolean;
}

export interface TimeRangeData {
  distance: string;
  unit: string;
  trend: string;
  bars: ActivityPoint[];
}

export interface GoalItem {
  id: string;
  title: string;
  currentText: string;
  targetText: string;
  percent: number;
  color: 'coral' | 'sky' | 'sage';
  icon: string;
}
