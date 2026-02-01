import { AvailabilitySlot } from "./availability.interface";

export enum BookingStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface IBooking {
  id: string;
  availabilityId: string;
  studentId: string;
  status: BookingStatusEnum;

  availabilitySlot?: AvailabilitySlot;
  startAt?: string | Date;
  endAt?: string | Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBooking {
  slotId: string;
  tutorProfileId: string;
}
