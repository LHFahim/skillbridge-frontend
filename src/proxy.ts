import { NextRequest, NextResponse } from "next/server";
import { RolesEnum } from "./constants/role";
import { userService } from "./services/user.service";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;

  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    if (data.user.role === RolesEnum.ADMIN) {
      isAdmin = true;
    } else if (data.user.role === RolesEnum.TUTOR) {
      isTutor = true;
    } else if (data.user.role === RolesEnum.STUDENT) {
      isStudent = true;
    }
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  if (isTutor) {
    return NextResponse.redirect(new URL("/tutor-dashboard", req.url));
  }

  if (isStudent && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/student-dashboard", req.url));
  }

  if (isStudent) {
    return NextResponse.redirect(new URL("/student-dashboard", req.url));
  }

  // if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
