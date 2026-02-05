import { env } from "@/env";
import { ICreateBooking } from "@/types/booking.interface";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const bookingService = {
  createBooking: async (payload: ICreateBooking) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/bookings`, {
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
          error: { message: "Error: Could not create booking." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getMyBookings: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/bookings/my-bookings`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: ["bookings"] },
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not fetch bookings." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  cancelBooking: async (bookingId: string, reason?: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/bookings/my-bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ reason: reason || "" }),
        },
      );

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Could not cancel booking." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
