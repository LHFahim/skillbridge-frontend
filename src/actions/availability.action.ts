"use server";

import { availabilityService } from "@/services/availability.service";
import { ICreateAvailabilitySlot } from "@/types/availability.interface";
import { updateTag } from "next/cache";

export const createAvailabilitySlot = async (slot: ICreateAvailabilitySlot) => {
  const res = await availabilityService.createAvailabilitySlot(slot);

  updateTag("availability");

  return res;
};
