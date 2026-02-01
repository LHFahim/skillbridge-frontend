"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingStatusEnum, IBooking } from "@/types/booking.interface";

export function BookingTable({ bookings }: { bookings: IBooking[] }) {
  const formatDateTime = (date: string | Date | undefined) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <div className="border rounded-md p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-8 text-muted-foreground"
              >
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => {
              const startAt =
                booking.availabilitySlot?.startAt ?? booking.startAt;
              const endAt = booking.availabilitySlot?.endAt ?? booking.endAt;

              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {formatDateTime(startAt)}
                  </TableCell>
                  <TableCell>{formatDateTime(endAt)}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
