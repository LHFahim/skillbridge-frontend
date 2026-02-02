import { env } from "@/env";
import { ICreateReview } from "@/types/review.interface";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewService = {
  createReview: async (payload: ICreateReview) => {
    try {
      const cookieStore = await cookies();

      console.log({ payload });

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("🚀 ~ data:", data);

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not create review." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
