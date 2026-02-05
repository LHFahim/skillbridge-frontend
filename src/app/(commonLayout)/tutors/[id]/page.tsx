import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { tutorService } from "@/services/tutor.service";

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorRes = await tutorService.getTutorById(id);
  const tutor = tutorRes.data || {};

  const reviews = tutor.reviewEntities.length ? tutor.reviewEntities : [];

  const name = tutor?.user?.name || "Unnamed Tutor";

  const image = tutor?.user?.image || null;

  const hourlyRate = tutor?.hourlyRate;
  const yearsExperience = tutor?.yearsExperience;
  const categories = tutor?.categories ?? [];
  const bio = tutor?.bio || "No bio provided.";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">{name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                  {name.charAt(0)}
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Hourly rate</p>
                <p className="text-lg font-semibold">
                  {hourlyRate ? `$${hourlyRate}/hr` : "Not available"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="text-lg font-semibold">
                  {yearsExperience
                    ? `${yearsExperience} years`
                    : "Not available"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.length ? (
                  categories.map((category: any) => (
                    <Badge key={category?.id || category?.name}>
                      {category?.name || category}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No categories listed.
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">About</p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {bio}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Reviews</span>
              <span className="font-medium text-foreground">
                {reviews.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Available Slots</span>
              <span className="font-medium text-foreground">
                {tutor?.availabilitySlots?.length ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Slots</h2>
        {tutor?.availabilitySlots?.length === 0 ? (
          <div className="rounded-md border p-6 text-sm text-muted-foreground">
            No available slots at the moment.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {tutor?.availabilitySlots?.map((slot: any) => (
              <Card key={slot.id}>
                <CardContent className="py-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Start</span>
                    <span className="text-sm text-foreground/80">
                      {formatDateTime(slot.startAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">End</span>
                    <span className="text-sm text-foreground/80">
                      {formatDateTime(slot.endAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Status</span>
                    <Badge
                      variant={slot.status === "OPEN" ? "default" : "secondary"}
                    >
                      {slot.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <div className="rounded-md border p-6 text-sm text-muted-foreground">
            No reviews yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review: any, index: number) => (
              <Card key={review?.id || index}>
                <CardContent className="py-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      {review?.user?.name || review?.student?.name || "Student"}
                    </p>
                    <Badge variant="secondary">
                      {review?.rating ? `${review.rating}/5` : "No rating"}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/80">
                    {review?.comment || "No comment provided."}
                  </p>
                  {review?.createdAt && (
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(review.createdAt)}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
