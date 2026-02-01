import { AvailabilityForm } from "@/components/modules/tutor/availability-form";
import { AvailabilityTable } from "@/components/modules/tutor/availability-table";
import { availabilityService } from "@/services/availability.service";

export default async function AvailabilityPage() {
  const response = await availabilityService.getAvailabilitySlots();
  const slots = response?.data?.data ?? [];

  return (
    <div className="w-full space-y-6">
      {/* form starts */}
      <div className="flex w-full justify-center pt-6 md:pt-10 p-6 md:p-10">
        <div className="w-full max-w-2xl">
          <AvailabilityForm />
        </div>
      </div>

      {/* table starts */}
      <div className="flex w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">
            Your Availability Slots
          </h2>
          <AvailabilityTable availabilitySlots={slots} />
        </div>
      </div>
    </div>
  );
}
