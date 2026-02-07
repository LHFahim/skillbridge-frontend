import { env } from "@/env";
import { ICreateTutor } from "@/types/tutor.interface";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const tutorService = {
  getAllTutors: async (filters?: {
    search?: string;
    categoryIds?: string[];
    minRate?: number;
    maxRate?: number;
    currency?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      // const cookieStore = await cookies();

      const params = new URLSearchParams();

      if (filters?.search) params.append("search", filters.search);

      if (filters?.categoryIds && filters.categoryIds.length > 0) {
        filters.categoryIds.forEach((id) => params.append("categoryIds", id));
      }

      if (filters?.minRate !== undefined)
        params.append("minRate", filters.minRate.toString());
      if (filters?.maxRate !== undefined)
        params.append("maxRate", filters.maxRate.toString());

      if (filters?.currency) params.append("currency", filters.currency);

      if (filters?.page !== undefined)
        params.append("page", filters.page.toString());
      if (filters?.limit !== undefined)
        params.append("limit", filters.limit.toString());

      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

      const queryString = params.toString();
      const url = queryString
        ? `${API_URL}/tutors?${queryString}`
        : `${API_URL}/tutors`;

      const res = await fetch(url, {
        method: "GET",
        // headers: {
        //   Cookie: cookieStore.toString(),
        // },
        cache: "no-store",
        next: { tags: ["tutors"] },
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch tutors." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getTutorById: async (tutorId: string) => {
    try {
      // const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutors/${tutorId}`, {
        method: "GET",
        // headers: {
        //   Cookie: cookieStore.toString(),
        // },
        cache: "no-store",
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch tutor profile." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  createTutorProfile: async (tutorData: ICreateTutor) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(tutorData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Tutor profile not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
