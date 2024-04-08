import { getUser } from "@/utils/apis/users/api";
import { useAuthStore } from "@/utils/zustand/store";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { ITokenData } from "@/utils/types/api";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const token = useAuthStore((state) => state.token);
  // const localToken = localStorage.getItem("token");

  let tokenValue: ITokenData | null = { is_admin: false } as ITokenData;

  useEffect(() => {
    if (token !== "") {
      handleGetUser();
      tokenValue = jwtDecode<ITokenData>(token);
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
    "/admin/business",
  ];

  const adminProtected = ["/admin", "/admin/users", "/admin/business"];
  const userProtected = [
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

  // jika sudah login
  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  // jika belum login
  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    // if (adminProtected.includes(pathname)) {
    //   if (tokenValue && tokenValue.is_admin === true) {
    //     return <Navigate to="/admin" />;
    //   } else {
    //     return <Navigate to="/" />;
    //   }
    // }

    // if (userProtected.includes(pathname)) {
    //   if (tokenValue && tokenValue.is_admin === false) {
    //     return <Navigate to="/" />;
    //   } else {
    //     return <Navigate to="/admin" />;
    //   }
    // }
  }

  return <Outlet />;
}
