import { AvailableSlotsTable } from "@/components/modules/booking/available-slots-table";
import { BookingTable } from "@/components/modules/booking/booking-table";
import { availabilityService } from "@/services/availability.service";
import { bookingService } from "@/services/booking.service";
import { AvailabilityStatusEnum } from "@/types/availability.interface";

export default async function BookingPage() {
  const availabilityResponse = await availabilityService.getAvailabilitySlots();

  const allSlots = availabilityResponse?.data?.data ?? [];

  const availableSlots = allSlots.filter(
    (slot: { status: AvailabilityStatusEnum }) =>
      slot.status === AvailabilityStatusEnum.OPEN,
  );

  const bookingsResponse = await bookingService.getMyBookings();

  const bookings = bookingsResponse?.data?.data ?? [];

  return (
    <div className="w-full space-y-10">
      <div className="flex w-full justify-center pt-6 md:pt-10 p-6 md:p-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Available Slots</h2>
          <AvailableSlotsTable availabilitySlots={availableSlots} />
        </div>
      </div>

      <div className="flex w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          <BookingTable bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
