import { getUser } from "@/utils/apis/users/api";
import { useAuthStore } from "@/utils/zustand/store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { ITokenData } from "@/utils/types/api";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);
  // const localToken = localStorage.getItem("token");

  let tokenValue: ITokenData | null = null;

  if (token) {
    tokenValue = jwtDecode<ITokenData>(token);
  }

  useEffect(() => {
    if (token !== "") {
      setAxiosConfig(token!);
      handleGetUser();
    }
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
    "/admin/businesses",
  ];

  const adminRoutes = ["/admin", "/admin/users", "/admin/businesses"];
  const userRoutes = [
    "/profile",
    "/invested-business",
    "/invested-business/:id_business",
    "/verification",
    "/my-business",
    "/create-business",
    "/business/:id_business/update",
    "/archive-business",
    "/withdraw",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (adminRoutes.includes(pathname)) {
      if (tokenValue && !tokenValue.is_admin) {
        return <Navigate to="/" />;
      }
    }

    if (userRoutes.includes(pathname)) {
      if (tokenValue && tokenValue.is_admin) {
        return <Navigate to="/admin" />;
      }
    }
  }

  return <Outlet />;
}
