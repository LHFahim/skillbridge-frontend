import { AdminBookingTable } from "@/components/modules/booking/admin-booking-table";
import { bookingService } from "@/services/booking.service";
import { type IBooking } from "@/types/booking.interface";

export default async function AdminBookingsPage() {
  const { data, error } = await bookingService.getAllBookings();
  const bookings: IBooking[] = data?.data || [];
  // console.log("🚀 ~ AdminBookingsPage ~ bookings:", bookings);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">All Bookings</h1>
        <p className="text-muted-foreground">
          Review all bookings across the platform.
        </p>
      </div>

      {error && (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          {error.message}
        </div>
      )}

      <AdminBookingTable bookings={bookings} />
    </div>
  );
}
