import { IRoute } from "@/types";

export const adminRoutes: IRoute[] = [
  {
    title: "User Management",
    items: [
      { title: "Categories", url: "/admin-dashboard/categories" },
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
    ],
  },
];
