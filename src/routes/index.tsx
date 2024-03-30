import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";
import MyProposals from "@/pages/user/my-proposals";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/my-proposals", element: <MyProposals /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
