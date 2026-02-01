import { TutorForm } from "@/components/modules/tutor/tutor-form";
import { categoryService } from "@/services/category.service";

export default async function TutorDashboardPage() {
  const response = await categoryService.getAllCategories();
  const categories = response?.data?.data ?? [];

  return (
    <div>
      <div>
        <TutorForm categories={categories} />
      </div>
    </div>
  );
}
