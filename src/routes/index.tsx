import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";
import MyProposals from "@/pages/user/my-proposals";
import DetailProposal from "@/pages/detail-proposal";
import NotFound from "@/pages/404";
import ArchiveProposals from "@/pages/user/archive-proposals";
import Withdraw from "@/pages/user/withdraw";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/my-proposals", element: <MyProposals /> },
  { path: "/detail-proposal/:id_proposal", element: <DetailProposal /> },
  { path: "/archive-proposals", element: <ArchiveProposals /> },
  { path: "/withdraw", element: <Withdraw /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
