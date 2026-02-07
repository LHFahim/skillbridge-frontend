import { EditProfileForm } from "@/components/modules/users/edit-profile-form";
import { userService } from "@/services/user.service";

export default async function StudentEditProfilePage() {
  const { data, error } = await userService.getSession();
  const user = data?.user;

  if (error || !user) {
    return (
      <div className="rounded-md border p-6 text-sm text-muted-foreground">
        Unable to load your profile. Please sign in again.
      </div>
    );
  }

  return (
    <EditProfileForm
      initialName={user.name}
      initialPhone={user.phone}
      initialImage={user.image}
    />
  );
}
