"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { BookingStatusEnum, IBooking } from "@/types/booking.interface";

export function AdminBookingTable({ bookings }: { bookings: IBooking[] }) {
  const getStatusBadge = (status: BookingStatusEnum) => {
    const badgeClass =
      status === BookingStatusEnum.CONFIRMED
        ? "bg-green-100 text-green-800"
        : status === BookingStatusEnum.CANCELLED
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800";

    return (
      <span className={`px-2 py-1 rounded text-sm font-medium ${badgeClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="border rounded-md p-5 overflow-x-auto scrollbar-hide">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Tutor</TableHead>
            <TableHead>Tutor Email</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Cancel Reason</TableHead>
            <TableHead>Cancelled By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center py-8 text-muted-foreground"
              >
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => {
              const startAt = booking.slot?.startAt || booking.startAt;
              const endAt = booking.slot?.endAt || booking.endAt;

              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.student?.name || "N/A"}
                  </TableCell>
                  <TableCell>{booking.student?.email || "N/A"}</TableCell>
                  <TableCell className="font-medium">
                    {booking.tutorProfile?.user?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {booking.tutorProfile?.user?.email || "N/A"}
                  </TableCell>
                  <TableCell>
                    {startAt ? formatDateTime(new Date(startAt)) : "N/A"}
                  </TableCell>
                  <TableCell>
                    {endAt ? formatDateTime(new Date(endAt)) : "N/A"}
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {booking.tutorProfile?.categories
                      ?.map((cat: any) => cat.name)
                      .join(", ") || "N/A"}
                  </TableCell>
                  <TableCell>{booking.cancelReason || "N/A"}</TableCell>
                  <TableCell>{booking.cancelledBy || "N/A"}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
