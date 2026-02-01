import { IRoute } from "@/types";

export const tutorRoutes: IRoute[] = [
  {
    title: "Tutor Management",
    items: [
      {
        title: "Create a Tutor",
        url: "/tutor-dashboard/create-tutor-profile",
      },
      {
        title: "Tutor History",
        url: "/tutor-dashboard/tutor-history",
      },
    ],
  },
];
