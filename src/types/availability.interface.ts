export interface AvailabilitySlot {
  id: string;

  tutorProfileId: string;

  startAt: Date;
  endAt: Date;

  status: AvailabilityStatusEnum;

  tutorProfile?: any;
  booking?: any | null;

  createdAt: Date;
  updatedAt: Date;
}

export enum AvailabilityStatusEnum {
  OPEN = "OPEN",
  BOOKED = "BOOKED",
}

export interface IAvailabilitySlotCreate {
  startAt: Date;
  endAt: Date;
}
