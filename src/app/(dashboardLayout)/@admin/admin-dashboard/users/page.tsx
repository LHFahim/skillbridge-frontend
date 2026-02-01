import { UserTable } from "@/components/modules/users/user-table";
import { userService } from "@/services/user.service";

export default async function UsersPage() {
  const response = await userService.getAllUsers();
  const users = response?.data?.data ?? [];

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
}
