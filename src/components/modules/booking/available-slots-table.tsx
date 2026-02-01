"use client";

import { createBooking } from "@/actions/booking.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AvailabilitySlot,
  AvailabilityStatusEnum,
} from "@/types/availability.interface";
import { useState } from "react";
import { toast } from "sonner";

export function AvailableSlotsTable({
  availabilitySlots,
}: {
  availabilitySlots: AvailabilitySlot[];
}) {
  const [isBooking, setIsBooking] = useState<string | null>(null);

  const handleBook = async (slotId: string) => {
    const toastId = toast.loading("Creating booking...");
    setIsBooking(slotId);

    try {
      const selectedSlot = availabilitySlots.find((slot) => slot.id === slotId);

      const res = await createBooking({
        slotId,
        tutorProfileId: selectedSlot?.tutorProfileId!,
      });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Booking created successfully", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsBooking(null);
    }
  };

  const formatDateTime = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: AvailabilityStatusEnum) => {
    const badgeClass =
      status === AvailabilityStatusEnum.OPEN
        ? "bg-green-100 text-green-800"
        : "bg-blue-100 text-blue-800";

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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availabilitySlots.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-muted-foreground"
              >
                No available slots found
              </TableCell>
            </TableRow>
          ) : (
            availabilitySlots.map((slot) => {
              return (
                <TableRow key={slot.id}>
                  <TableCell className="font-medium">
                    {formatDateTime(slot.startAt)}
                  </TableCell>
                  <TableCell>{formatDateTime(slot.endAt)}</TableCell>
                  <TableCell>{getStatusBadge(slot.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleBook(slot.id)}
                      disabled={isBooking === slot.id}
                    >
                      {isBooking === slot.id ? "Booking..." : "Book"}
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
