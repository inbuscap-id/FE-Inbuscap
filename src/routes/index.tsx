import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArchiveBusiness from "@/pages/user/archive-business";
import Business from "@/pages/admin/business";
import CreateBusiness from "@/pages/user/create-business";
import DetailBusiness from "@/pages/detail-business";
import Homepage from "@/pages/App";
import InvestedBusiness from "@/pages/user/invested-business";
import Login from "@/pages/auth/login";
import MyBusiness from "@/pages/user/my-business";
import MyProfile from "@/pages/admin";
import NotFound from "@/pages/404";
import Profile from "@/pages/user";
import ProtectedRoutes from "./protected-routes";
import Register from "@/pages/auth/register";
import Users from "@/pages/admin/users";
import UpdateBusiness from "@/pages/user/update-business";
import Verification from "@/pages/user/verification";
import Withdraw from "@/pages/user/withdraw";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/business/:id_business", element: <DetailBusiness /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
      { path: "/profile", element: <Profile /> },
      { path: "/invested-business", element: <InvestedBusiness /> },
      { path: "/verification", element: <Verification /> },
      { path: "/my-business", element: <MyBusiness /> },
      { path: "/create-business", element: <CreateBusiness /> },
      { path: "/business/:id_business/update", element: <UpdateBusiness /> },
      { path: "/archive-business", element: <ArchiveBusiness /> },
      { path: "/withdraw", element: <Withdraw /> },
      { path: "/admin", element: <MyProfile /> },
      { path: "/admin/users", element: <Users /> },
      { path: "/admin/business", element: <Business /> },
      // { path: "/verifications", element: <Verifikasi /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
