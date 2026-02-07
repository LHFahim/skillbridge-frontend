import TutorCard from "@/components/modules/homepage/TutorCard";
import {
  TutorSearchFilter,
  type ITutorFilters,
} from "@/components/modules/tutor/tutor-search-filter";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { Suspense } from "react";

async function TutorsGrid({ filters }: { filters?: ITutorFilters }) {
  const { data, error } = await tutorService.getAllTutors(filters);

  const tutors = data?.data || [];

  if (error) {
    return (
      <div className="rounded-md border p-6 text-sm text-muted-foreground">
        {error.message}
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="rounded-md border p-6 text-sm text-muted-foreground">
        No tutors found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor: any) => (
        <TutorCard key={tutor?.id} tutor={tutor} />
      ))}
    </div>
  );
}

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const rawCategoryIds = params.categoryIds;
  const categoryIds = Array.isArray(rawCategoryIds)
    ? rawCategoryIds.map((id) => String(id))
    : typeof rawCategoryIds === "string"
      ? rawCategoryIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : undefined;

  const filters: ITutorFilters = {
    ...(params.search && { search: String(params.search) }),
    ...(categoryIds && categoryIds.length > 0 && { categoryIds }),
    ...(params.minRate && { minRate: parseInt(String(params.minRate)) }),
    ...(params.maxRate && { maxRate: parseInt(String(params.maxRate)) }),
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  // filter dropdown
  const { data: categoriesData } = await categoryService.getAllCategories();
  const categories = categoriesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">All Tutors</h1>
        <p className="text-muted-foreground">
          Explore tutor profiles, search by subject, filter by category and
          price.
        </p>
      </div>

      <TutorSearchFilter categories={categories} />

      <Suspense fallback={<div>Loading...</div>}>
        <TutorsGrid filters={hasActiveFilters ? filters : undefined} />
      </Suspense>
    </div>
  );
}
