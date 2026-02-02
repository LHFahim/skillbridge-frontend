import { IRoute } from "@/types";

export const tutorRoutes: IRoute[] = [
  {
    title: "Tutor Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Create a Tutor",
        url: "/tutor-dashboard/create-tutor-profile",
      },
      { title: "Availability", url: "/tutor-dashboard/availability" },
      {
        title: "Tutor History",
        url: "/tutor-dashboard/tutor-history",
      },
    ],
  },
];
