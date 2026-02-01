import { env } from "@/env";
import { ICreateAvailabilitySlot } from "@/types/availability.interface";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const availabilityService = {
  createAvailabilitySlot: async (slot: ICreateAvailabilitySlot) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(slot),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not create availability slot." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAvailabilitySlots: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/availability`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: ["availability"] },
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch availability slots." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  deleteAvailabilitySlot: async (slotId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/availability/${slotId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not delete availability slot." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
