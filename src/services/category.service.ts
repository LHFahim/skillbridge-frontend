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
};
