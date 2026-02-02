"use server";

import { bookingService } from "@/services/booking.service";
import { ICreateBooking } from "@/types/booking.interface";
import { revalidateTag } from "next/cache";

export const createBooking = async (payload: ICreateBooking) => {
  const res = await bookingService.createBooking(payload);

  revalidateTag("bookings", "default");
  revalidateTag("availability", "default");

  return res;
};

export const cancelBooking = async (bookingId: string, reason?: string) => {
  const res = await bookingService.cancelBooking(bookingId, reason);

  revalidateTag("bookings", "default");

  return res;
};
