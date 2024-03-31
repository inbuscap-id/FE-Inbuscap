import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";
import DetailProposal from "@/pages/detail-proposal";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/detail-proposal/:id_proposal", element: <DetailProposal /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
