import { env } from "@/env";
import { ICreateCategory } from "@/types/categories.interface";
import { cookies } from "next/headers";
import { userService } from "./user.service";

const API_URL = env.API_URL;

export const categoryService = {
  createCategory: async (categoryData: ICreateCategory) => {
    try {
      const userData = await userService.getSession();
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          ...categoryData,
        }),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Category not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllCategories: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch categories." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteCategory: async (categoryId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      console.log("🚀 ~ data:", data);

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not delete category." },
        };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
