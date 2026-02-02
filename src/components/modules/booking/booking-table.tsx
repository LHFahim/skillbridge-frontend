"use client";

import { cancelBooking } from "@/actions/booking.action";
import { createReview } from "@/actions/review.action";
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
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function BookingTable({ bookings }: { bookings: IBooking[] }) {
  const [reviewingBooking, setReviewingBooking] = useState<IBooking | null>(
    null,
  );
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [cancelingBooking, setCancelingBooking] = useState<IBooking | null>(
    null,
  );
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);
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

  const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reviewingBooking || reviewRating === null) {
      return;
    }

    const toastId = toast.loading("Submitting review...");
    setIsSubmittingReview(true);

    try {
      const res = await createReview({
        bookingId: reviewingBooking.id,
        rating: reviewRating,
        comment: reviewComment.trim() || undefined,
      });

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Review submitted successfully", { id: toastId });
      setReviewingBooking(null);
      setReviewRating(null);
      setReviewComment("");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleSubmitCancel = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cancelingBooking) {
      return;
    }

    const toastId = toast.loading("Canceling booking...");
    setIsSubmittingCancel(true);

    try {
      const res = await cancelBooking(
        cancelingBooking.id,
        cancelReason.trim() || undefined,
      );

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Booking cancelled successfully", { id: toastId });
      setCancelingBooking(null);
      setCancelReason("");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmittingCancel(false);
    }
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
                        <DropdownMenuItem
                          onClick={() => {
                            setCancelingBooking(booking);
                            setCancelReason("");
                          }}
                        >
                          Cancel
                        </DropdownMenuItem>
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
            id="review-form"
            className="flex flex-col gap-5 p-4"
            onSubmit={handleSubmitReview}
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
              disabled={isSubmittingReview}
            >
              Close
            </Button>
            <Button
              type="submit"
              form="review-form"
              disabled={reviewRating === null || isSubmittingReview}
            >
              {isSubmittingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet
        open={!!cancelingBooking}
        onOpenChange={(open) => {
          if (!open) {
            setCancelingBooking(null);
          }
        }}
      >
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Cancel Booking</SheetTitle>
            <SheetDescription>
              Are you sure you want to cancel this booking?
            </SheetDescription>
          </SheetHeader>
          <form
            id="cancel-form"
            className="flex flex-col gap-5 p-4"
            onSubmit={handleSubmitCancel}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Reason</label>
              <Textarea
                placeholder="Tell us why you're canceling this booking"
                value={cancelReason}
                onChange={(event) => setCancelReason(event.target.value)}
              />
            </div>
          </form>
          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCancelingBooking(null)}
              disabled={isSubmittingCancel}
            >
              Keep Booking
            </Button>
            <Button
              type="submit"
              form="cancel-form"
              variant="destructive"
              disabled={isSubmittingCancel}
            >
              {isSubmittingCancel ? "Canceling..." : "Cancel Booking"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
