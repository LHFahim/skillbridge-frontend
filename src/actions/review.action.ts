"use server";

import { reviewService } from "@/services/review.service";
import { ICreateReview } from "@/types/review.interface";
import { revalidateTag } from "next/cache";

export const createReview = async (payload: ICreateReview) => {
  const res = await reviewService.createReview(payload);

  revalidateTag("bookings", "default");

  return res;
};
