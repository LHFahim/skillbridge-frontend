import { Eye, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TutorCard({ tutor }: { tutor: any }) {
  return (
    <Card className="h-full overflow-hidden border-none shadow-md transition-all duration-300 pb-2">
      <div className="relative h-56 w-full overflow-hidden">
        {/* for image */}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          {tutor.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {tutor.hourlyRate ? `$${tutor.hourlyRate}/hr` : "Rate not available"}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {tutor.availableSlots || 0}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {tutor.reviews || 0}
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
          href={`/tutors/${tutor.id}`}
          className="text-sm font-semibold text-primary group-hover:underline"
        >
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
