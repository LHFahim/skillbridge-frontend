import { MessageCircle, TimerIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function TutorCard({ tutor }: { tutor: any }) {
  const tutorName = tutor?.user?.name || "Unnamed Tutor";

  const hourlyRate = tutor?.hourlyRate || 0;

  const availableSlotsCount = tutor?.availabilitySlots?.length || 0;

  const reviewCount = tutor?.reviewEntities?.length || 0;

  const profileId = tutor?.id;

  return (
    <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 pb-2">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={tutor?.user?.image || "/tutor.png"}
          alt={tutorName}
          fill
          // className="object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          {tutorName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {hourlyRate ? `$${hourlyRate}/hr` : "Rate not available"}
        </p>
        <div className="flex flex-wrap gap-2">
          {tutor?.categories?.length ? (
            tutor.categories.map((category: any) => (
              <Badge key={category?.id} variant="secondary">
                {category?.name}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">
              No categories listed
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <TimerIcon className="h-4 w-4" />
            {availableSlotsCount}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {reviewCount}
          </span>

          {tutor.isFeatured && (
            <Badge
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Featured
            </Badge>
          )}
        </div>

        <Link
          href={`/tutors/${profileId}`}
          className="text-sm font-semibold text-primary group-hover:underline"
        >
          View More
        </Link>
      </CardFooter>
    </Card>
  );
}
