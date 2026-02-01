"use server";

import { categoryService } from "@/services/category.service";
import { ICreateCategory } from "@/types/categories.interface";
import { updateTag } from "next/cache";

export const createCategory = async (payload: ICreateCategory) => {
  const res = await categoryService.createCategory(payload);

  updateTag("categories");

  return res;
};

export const deleteCategory = async (categoryId: string) => {
  const res = await categoryService.deleteCategory(categoryId);

  updateTag("categories");

  return res;
};
