import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RolesEnum } from "@/constants/role";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

export default async function AdminAnalyticsPage() {
  const [
    { data: usersRes, error: usersError },
    { data: tutorsRes },
    { data: categoriesRes },
  ] = await Promise.all([
    userService.getAllUsers(),
    tutorService.getAllTutors(),
    categoryService.getAllCategories(),
  ]);

  const users = usersRes?.data || [];
  const tutors = tutorsRes?.data || [];
  const categories = categoriesRes?.data || [];

  const totalUsers = users.length;

  const totalStudents = users.filter(
    (user: any) => user.role === RolesEnum.STUDENT,
  ).length;

  const totalTutors = users.filter(
    (user: any) => user.role === RolesEnum.TUTOR,
  ).length;

  const totalAdmins = users.filter(
    (user: any) => user.role === RolesEnum.ADMIN,
  ).length;

  const totalTutorProfiles = tutors.length;
  const totalCategories = categories.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Analytics & Stats</h1>
        <p className="text-muted-foreground">
          Overview of platform activity and growth.
        </p>
      </div>

      {usersError && (
        <div className="rounded-md border p-4 text-sm text-muted-foreground">
          {usersError.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-blue-200/60 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-200/90">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-blue-100">
              {totalUsers}
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200/60 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-200/90">
              Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-emerald-100">
              {totalStudents}
            </div>
          </CardContent>
        </Card>
        <Card className="border-violet-200/60 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-violet-200/90">
              Tutors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-violet-100">
              {totalTutors}
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200/60 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-200/90">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-amber-100">
              {totalAdmins}
            </div>
          </CardContent>
        </Card>
        <Card className="border-rose-200/60 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-rose-200/90">
              Tutor Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-rose-100">
              {totalTutorProfiles}
            </div>
          </CardContent>
        </Card>
        <Card className="border-sky-200/60 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sky-200/90">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-sky-100">
              {totalCategories}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
