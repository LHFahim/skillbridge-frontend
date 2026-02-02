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
import { formatDateTime } from "@/lib/utils";
import {
  AvailabilitySlot,
  AvailabilityStatusEnum,
} from "@/types/availability.interface";
import Image from "next/image";
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
            <TableHead>Tutor Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Work Experience</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {availabilitySlots.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
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
                    {slot.tutorProfile?.user?.name || "Unnamed"}
                  </TableCell>

                  <TableCell className="font-medium">
                    {formatDateTime(slot.startAt)}
                  </TableCell>

                  <TableCell>{formatDateTime(slot.endAt)}</TableCell>

                  <TableCell>{getStatusBadge(slot.status)}</TableCell>

                  <TableCell>
                    {slot.tutorProfile?.categories
                      ?.map((category: any) => category.name)
                      .join(", ") || "N/A"}
                  </TableCell>

                  <TableCell>
                    {`${slot.tutorProfile?.yearsExperience} Years` || "N/A"}
                  </TableCell>

                  <TableCell>
                    {slot.tutorProfile?.user?.image ? (
                      <Image
                        src={slot.tutorProfile.user.image}
                        alt="Tutor"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        {slot.tutorProfile?.user?.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </TableCell>

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
