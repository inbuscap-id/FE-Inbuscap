import { useAuthStore } from "@/utils/zustand/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/invested-business",
    "/verification",
    "/my-business",
    "/create-business",
    "/business/:id_business/update",
    "/archive-business",
    "/withdraw",
    "/admin",
    "/admin/users",
    "/admin/business",
  ];

  //   const adminProtected = ["/dashboard"];
  //   const userProtected = ["/profile/borrows"];

  // jika sudah login
  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  // jika belum login
  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }

  return <Outlet />;
}
