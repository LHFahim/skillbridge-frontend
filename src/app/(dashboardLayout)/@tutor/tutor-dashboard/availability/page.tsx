import { AvailabilityForm } from "@/components/modules/tutor/availability-form";

export default function AvailabilityPage() {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center pt-6 md:pt-10 p-6 md:p-10">
        <div className="w-full max-w-2xl">
          <AvailabilityForm />
        </div>
      </div>
    </div>
  );
}
