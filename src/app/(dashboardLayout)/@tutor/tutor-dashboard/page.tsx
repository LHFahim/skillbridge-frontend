import { BookingTable } from "@/components/modules/booking/booking-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingService } from "@/services/booking.service";
import { BookingStatusEnum, type IBooking } from "@/types/booking.interface";

function getBookingStats(bookings: IBooking[]) {
  const total = bookings.length;
  const confirmed = bookings.filter(
    (booking) => booking.status === BookingStatusEnum.CONFIRMED,
  ).length;

  const pending = bookings.filter(
    (booking) => booking.status === BookingStatusEnum.PENDING,
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === BookingStatusEnum.CANCELLED,
  ).length;

  const now = new Date();

  const upcoming = bookings.filter((booking) => {
    if (booking.status !== BookingStatusEnum.CONFIRMED) return false;

    const startAt = booking.slot?.startAt || booking.startAt;

    if (!startAt) return false;
    return new Date(startAt) > now;
  }).length;

  return { total, confirmed, pending, cancelled, upcoming };
}

export default async function TutorDashboardPage() {
  const { data, error } = await bookingService.getTutorBookings();
  const bookings: IBooking[] = data?.data || [];
  const stats = getBookingStats(bookings);

  // console.log("data", data);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">
          Track your sessions and bookings.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          {error.message}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card className="border-blue-200/60 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200/90">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-blue-100">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200/60 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-200/90">
                Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-emerald-100">
                {stats.confirmed}
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200/60 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-200/90">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-amber-100">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
          <Card className="border-rose-200/60 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-rose-200/90">
                Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-rose-100">
                {stats.cancelled}
              </div>
            </CardContent>
          </Card>
          <Card className="border-violet-200/60 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-violet-200/90">
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-violet-100">
                {stats.upcoming}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-3 mt-10">
        <h2 className="text-lg font-semibold">Your Bookings</h2>
        <BookingTable bookings={bookings} />
      </div>
    </div>
  );
}
