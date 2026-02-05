import { env } from "@/env";
import { ICreateReview } from "@/types/review.interface";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewService = {
  getReviewsByTutorId: async (tutorProfileId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/reviews?tutorProfileId=${tutorProfileId}`,
        {
          method: "GET",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch reviews." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  createReview: async (payload: ICreateReview) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

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
