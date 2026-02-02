"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/utils";
import { BookingStatusEnum, IBooking } from "@/types/booking.interface";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

export function BookingTable({ bookings }: { bookings: IBooking[] }) {
  const [reviewingBooking, setReviewingBooking] = useState<IBooking | null>(
    null,
  );
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState("");
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setReviewingBooking(booking);
                            setReviewRating(null);
                            setReviewComment("");
                          }}
                        >
                          Review
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <Sheet
        open={!!reviewingBooking}
        onOpenChange={(open) => {
          if (!open) {
            setReviewingBooking(null);
          }
        }}
      >
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Leave a review</SheetTitle>
            <SheetDescription>
              Share your feedback for this booking.
            </SheetDescription>
          </SheetHeader>
          <form
            className="flex flex-col gap-5 p-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={reviewRating === value}
                      onChange={() => setReviewRating(value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Comment</label>
              <Textarea
                placeholder="Optional"
                value={reviewComment}
                onChange={(event) => setReviewComment(event.target.value)}
              />
            </div>
          </form>
          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReviewingBooking(null)}
            >
              Close
            </Button>
            <Button type="button" disabled={reviewRating === null}>
              Submit Review
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
