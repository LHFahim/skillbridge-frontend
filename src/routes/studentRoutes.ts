import { IRoute } from "@/types";

export const studentRoutes: IRoute[] = [
  {
    title: "Student Management",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/student-dashboard",
      },
      {
        title: "Booking",
        url: "/student-dashboard/booking",
      },
      // {
      //   title: "Student History",
      //   url: "/dashboard/student-history",
      // },
    ],
  },
];
