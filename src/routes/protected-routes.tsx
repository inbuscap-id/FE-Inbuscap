import { getUser } from "@/utils/apis/users/api";
import { useAuthStore } from "@/utils/zustand/store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    token !== "" && handleGetUser();
  }, [token]);

  const handleGetUser = async () => {
    try {
      const result = await getUser();
      useAuthStore.getState().setUser(result.data);
    } catch (error) {
      toast((error as Error).message);
    }
  };

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/invested-business",
    "/invested-business/:id_business",
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
