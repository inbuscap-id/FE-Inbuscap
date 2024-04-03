import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Verifikasi from "@/pages/auth/verifikasi";
import MyBusiness from "@/pages/user/my-business";
import DetailBusiness from "@/pages/detail-business";
import NotFound from "@/pages/404";
import ArchiveBusiness from "@/pages/user/archive-business";
import Withdraw from "@/pages/user/withdraw";
import MyProfile from "@/pages/admin";
import Profile from "@/pages/user";
import Verification from "@/pages/user/verification";
import InvestedBusiness from "@/pages/user/invested-business";
import CreateBusiness from "@/pages/user/create-business";
import UpdateBusiness from "@/pages/user/update-business";
import Users from "@/pages/admin/users";
import Business from "@/pages/admin/business";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verifications", element: <Verifikasi /> },
  { path: "/profile", element: <Profile /> },
  { path: "/verification", element: <Verification /> },
  { path: "/create-business", element: <CreateBusiness /> },
  { path: "/update-business", element: <UpdateBusiness /> },
  { path: "/my-business", element: <MyBusiness /> },
  { path: "/invested-business", element: <InvestedBusiness /> },
  { path: "/detail-business/:id_business", element: <DetailBusiness /> },
  { path: "/archive-business", element: <ArchiveBusiness /> },
  { path: "/withdraw", element: <Withdraw /> },
  { path: "/admin", element: <MyProfile /> },
  { path: "/admin/users", element: <Users /> },
  { path: "/admin/businesses", element: <Business /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
