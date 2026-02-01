import { CategoriesForm } from "@/components/modules/categories/categories-form";
import { CategoryTable } from "@/components/modules/categories/categories-table";

import { categoryService } from "@/services/category.service";

export default async function CategoriesPage() {
  const response = await categoryService.getAllCategories();
  const categories = response?.data?.data ?? [];
  return (
    <div className="w-full">
      <div className="flex w-full justify-center pt-6 md:pt-10 p-6 md:p-10 space-x-10">
        <div className="w-full max-w-sm">
          <CategoriesForm />
        </div>
        <div>
          <CategoryTable categories={categories} />
        </div>
      </div>
    </div>
  );
}
