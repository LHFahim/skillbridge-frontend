"use server";

import { availabilityService } from "@/services/availability.service";
import { ICreateAvailabilitySlot } from "@/types/availability.interface";
import { revalidateTag } from "next/cache";

export const createAvailabilitySlot = async (slot: ICreateAvailabilitySlot) => {
  const res = await availabilityService.createAvailabilitySlot(slot);

  revalidateTag("availability", "default");

  return res;
};

export const deleteAvailabilitySlot = async (slotId: string) => {
  const res = await availabilityService.deleteAvailabilitySlot(slotId);

  revalidateTag("availability", "default");

  return res;
};
