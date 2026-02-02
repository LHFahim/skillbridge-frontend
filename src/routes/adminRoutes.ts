import { IRoute } from "@/types";

export const adminRoutes: IRoute[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      { title: "Categories", url: "/admin-dashboard/categories" },
      { title: "Users", url: "/admin-dashboard/users" },
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
    ],
  },
];
