export interface ICreateTutor {
  hourlyRate: number;
  yearsExperience: number;
  categories: string[];
}

export interface IUpdateTutorProfile {
  hourlyRate?: number;
  yearsExperience?: number;
  categoryIds?: string[];
  currency?: string;
  isActive?: boolean;
}
