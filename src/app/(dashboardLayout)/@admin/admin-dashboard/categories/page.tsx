import { CategoriesForm } from "@/components/modules/categories/categories-form";

export default function CategoriesPage() {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center pt-6 md:pt-10 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <CategoriesForm />
        </div>
      </div>
    </div>
  );
}
