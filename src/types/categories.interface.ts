export interface ICreateCategory {
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;

  tutors?: any[];

  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}
