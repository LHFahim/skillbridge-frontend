import { TutorForm } from "@/components/modules/tutor/tutor-form";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

export default async function UpdateTutorProfilePage() {
  const { data: sessionData, error: sessionError } =
    await userService.getSession();
  const userId = sessionData?.user?.id;

  const response = await categoryService.getAllCategories();
  const categories = response?.data?.data ?? [];

  if (sessionError || !userId) {
    return (
      <div className="rounded-md border p-6 text-sm text-muted-foreground">
        Unable to load your session. Please sign in again.
      </div>
    );
  }

  const tutorRes = await tutorService.getTutorByUserId(userId);
  console.log("🚀 ~ UpdateTutorProfilePage ~ tutorRes:", tutorRes);
  const tutorProfile = tutorRes?.data;

  if (tutorRes?.error || !tutorProfile) {
    return (
      <div className="rounded-md border p-6 text-sm text-muted-foreground">
        Tutor profile not found. Please create your profile first.
      </div>
    );
  }

  const initialValues = {
    hourlyRate: tutorProfile.hourlyRate,
    yearsExperience: tutorProfile.yearsExperience,
    categories: (tutorProfile.categories || []).map((cat: any) => cat.id),
  };

  return (
    <div>
      <TutorForm
        categories={categories}
        mode="update"
        initialValues={initialValues}
      />
    </div>
  );
}
