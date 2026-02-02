"use client";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export function BookingTable({ bookings }: { bookings: IBooking[] }) {
  const [reviewingBooking, setReviewingBooking] = useState<IBooking | null>(
    null,
  );
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
            <TableHead>Tutor Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Cancel Reason</TableHead>
            <TableHead>Cancelled By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-muted-foreground"
              >
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => {
              const startAt = booking.slot?.startAt;
              const endAt = booking.slot?.endAt;

              const slot = booking.slot;

              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.tutorProfile?.user?.name || "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatDateTime(new Date(startAt!))}
                  </TableCell>
                  <TableCell>{formatDateTime(new Date(endAt!))}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {booking.tutorProfile?.categories
                      ?.map((cat: any) => cat.name)
                      .join(", ") || "N/A"}
                  </TableCell>
                  <TableCell>{booking.cancelReason || "N/A"}</TableCell>
                  <TableCell>{booking.cancelledBy || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setReviewingBooking(booking)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
