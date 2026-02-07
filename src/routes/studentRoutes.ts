import { IRoute } from "@/types";

export const studentRoutes: IRoute[] = [
  {
    title: "Student Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Dashboard",
        url: "/dashboard/student-dashboard",
      },
      {
        title: "Booking",
        url: "/student-dashboard/booking",
      },
      {
        title: "Edit Profile",
        url: "/student-dashboard/edit-profile",
      },
      // {
      //   title: "Student History",
      //   url: "/dashboard/student-history",
      // },
    ],
  },
];
