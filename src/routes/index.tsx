import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  // Future pages slot in here, e.g.:
  // { path: "/dashboard", element: <Dashboard /> },
  // { path: "/login",     element: <Login /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
