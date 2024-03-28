import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "@/pages/App";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
