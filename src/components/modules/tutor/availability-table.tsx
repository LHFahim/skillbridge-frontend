"use client";

import { deleteAvailabilitySlot } from "@/actions/availability.action";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AvailabilityTable({
  availabilitySlots,
}: {
  availabilitySlots: AvailabilitySlot[];
}) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (slotId: string) => {
    const toastId = toast.loading("Deleting availability slot...");
    setIsDeleting(slotId);

    try {
      const res = await deleteAvailabilitySlot(slotId);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        setIsDeleting(null);
        return;
      }

      toast.success("Availability slot deleted successfully", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsDeleting(null);
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
                No availability slots found
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(slot.id)}
                          disabled={isDeleting === slot.id}
                        >
                          {isDeleting === slot.id ? "Deleting..." : "Delete"}
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
    </div>
  );
}
