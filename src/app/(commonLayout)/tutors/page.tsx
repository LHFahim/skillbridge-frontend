import TutorCard from "@/components/modules/homepage/TutorCard";
import { tutorService } from "@/services/tutor.service";

export default async function TutorsPage() {
  const { data, error } = await tutorService.getAllTutors();
  const tutors = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">All Tutors</h1>
          <p className="text-muted-foreground">
            Explore tutor profiles and view full details.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          {error.message}
        </div>
      ) : tutors.length === 0 ? (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No tutors found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor: any) => (
            <TutorCard key={tutor?.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
