"use server";

import { tutorService } from "@/services/tutor.service";
import { ICreateTutor } from "@/types/tutor.interface";
import { updateTag } from "next/cache";

export const createTutorProfile = async (payload: ICreateTutor) => {
  const res = await tutorService.createTutorProfile(payload);

  updateTag("tutors");

  return res;
};
