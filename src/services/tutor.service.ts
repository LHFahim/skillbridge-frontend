import { env } from "@/env";
import { ICreateTutor } from "@/types/tutor.interface";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const tutorService = {
  getAllTutors: async () => {
    try {
      // const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutors`, {
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
