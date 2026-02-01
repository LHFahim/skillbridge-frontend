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
