import { IRoute } from "@/types";

export const adminRoutes: IRoute[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
      { title: "Categories", url: "/admin-dashboard/categories" },
      { title: "Users", url: "/admin-dashboard/users" },
    ],
  },
];
