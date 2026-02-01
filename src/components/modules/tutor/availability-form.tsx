"use client";

import { createAvailabilitySlot } from "@/actions/availability.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const generateTimeSlots = () => {
  const slots = [];

  for (let hour = 10; hour < 22; hour++) {
    const startHour = hour.toString().padStart(2, "0");

    const endHour = (hour + 1).toString().padStart(2, "0");

    const startTime12 =
      hour < 12
        ? `${hour}:00 AM`
        : hour === 12
          ? "12:00 PM"
          : `${hour - 12}:00 PM`;

    const endTime12 =
      hour + 1 < 12
        ? `${hour + 1}:00 AM`
        : hour + 1 === 12
          ? "12:00 PM"
          : `${hour + 1 - 12}:00 PM`;

    slots.push({
      id: `${startHour}:00`,
      label: `${startTime12} - ${endTime12}`,
    });
  }

  return slots;
};

const timeSlots = generateTimeSlots();

const dayMap: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0,
};

export function AvailabilityForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [availability, setAvailability] = useState<Record<string, string[]>>(
    daysOfWeek.reduce(
      (acc, day) => {
        acc[day] = [];
        return acc;
      },
      {} as Record<string, string[]>,
    ),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSlot = (slotId: string) => {
    setAvailability((prev) => {
      const daySlots = prev[selectedDay] || [];

      if (daySlots.includes(slotId)) {
        return {
          ...prev,
          [selectedDay]: daySlots.filter((s) => s !== slotId),
        };
      } else {
        return {
          ...prev,
          [selectedDay]: [...daySlots, slotId],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Updating availability...");

    setIsSubmitting(true);

    try {
      const availabilitySlots = Object.entries(availability)
        .filter(([, slots]) => slots.length > 0)
        .flatMap(([day, slots]) =>
          slots.map((timeSlot) => {
            const [startTimeStr] = timeSlot.split(":");
            const startHour = parseInt(startTimeStr);
            const endHour = startHour + 1;

            const now = new Date();
            const dayOfWeek = dayMap[day];
            const daysUntil = (dayOfWeek - now.getDay() + 7) % 7 || 7;
            const slotDate = new Date(now);
            slotDate.setDate(slotDate.getDate() + daysUntil);

            const startAt = new Date(slotDate);
            startAt.setHours(startHour, 0, 0, 0);

            const endAt = new Date(slotDate);
            endAt.setHours(endHour, 0, 0, 0);

            return {
              startAt: startAt.toISOString(),
              endAt: endAt.toISOString(),
            };
          }),
        );

      if (availabilitySlots.length === 0) {
        toast.error("Please select at least one time slot", { id: toastId });

        setIsSubmitting(false);
        return;
      }

      for (const slot of availabilitySlots) {
        await createAvailabilitySlot(slot);
      }

      toast.success("Availability updated successfully", { id: toastId });

      setAvailability(
        daysOfWeek.reduce(
          (acc, day) => {
            acc[day] = [];
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      );
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDaySlots = availability[selectedDay] || [];

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Manage Your Availability</CardTitle>
        <CardDescription>
          Select a day and choose your available time slots (10 AM - 10 PM).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="availability-form" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* day selection here */}
            <div className="space-y-3">
              <FieldLabel htmlFor="day-select">Select Day</FieldLabel>
              <Select
                value={selectedDay}
                onValueChange={setSelectedDay}
                disabled={isSubmitting}
              >
                <SelectTrigger id="day-select" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* time slots here */}
            <div className="space-y-3">
              <FieldLabel>Available Time Slots for {selectedDay}</FieldLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => toggleSlot(slot.id)}
                    className={`p-2 rounded-md border text-sm transition-colors ${
                      currentDaySlots.includes(slot.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-input bg-background hover:bg-accent"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected slots: {currentDaySlots.length}
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button
          form="availability-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Availability"}
        </Button>
      </CardFooter>
    </Card>
  );
}
