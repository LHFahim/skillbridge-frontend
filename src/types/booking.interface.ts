import { AvailabilitySlot } from "./availability.interface";

export enum BookingStatusEnum {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface IBooking {
  id: string;

  cancelReason?: string;
  cancelledBy?: string;

  availabilityId?: string;
  slotId?: string;
  studentId: string;
  status: BookingStatusEnum;

  slot?: AvailabilitySlot;
  startAt?: string | Date;
  endAt?: string | Date;

  tutorProfile?: any;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBooking {
  slotId: string;
  tutorProfileId: string;
}
