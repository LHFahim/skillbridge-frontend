import TutorCard from "@/components/modules/homepage/TutorCard";
import { tutorService } from "@/services/tutor.service";
import Image from "next/image";

export default async function Home() {
  const { data, error } = await tutorService.getAllTutors({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 12,
    page: 1,
  });

  const tutors = data?.data || [];
  const tutorsWithRatings = tutors.map((tutor: any) => {
    const reviews = tutor?.reviewEntities || [];
    const totalRatings = reviews.reduce(
      (sum: number, review: any) => sum + (review?.rating || 0),
      0,
    );
    const avgRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

    return {
      ...tutor,
      avgRating,
      isFeatured: avgRating >= 4.5,
    };
  });

  const featuredTutors = tutorsWithRatings.filter(
    (tutor: any) => tutor?.isFeatured,
  );

  const visibleTutors = (
    featuredTutors.length > 0 ? featuredTutors : tutorsWithRatings
  ).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 mt-8 h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="relative w-full h-96 mb-6">
          <Image
            src="https://images.unsplash.com/photo-1621356986575-05811227a42e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          />
        </div>
        <h1 className={"text-5xl font-bold text-center mb-4"}>
          Welcome to SkillBridge
        </h1>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Our Highly Rated Tutors</h2>
        {error ? (
          <div className="rounded-md border p-6 text-sm text-muted-foreground">
            {error.message}
          </div>
        ) : visibleTutors.length === 0 ? (
          <div className="rounded-md border p-6 text-sm text-muted-foreground">
            No highly rated tutors available right now.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
