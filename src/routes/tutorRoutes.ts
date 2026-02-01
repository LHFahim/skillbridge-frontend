import { IRoute } from "@/types";

export const tutorRoutes: IRoute[] = [
  {
    title: "Tutor Management",
    items: [
      {
        title: "Create a Tutor",
        url: "/dashboard/create-tutor-profile",
      },
      {
        title: "Tutor History",
        url: "/dashboard/tutor-history",
      },
    ],
  },
];
