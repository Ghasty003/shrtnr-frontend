import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import VerifyPage from "@/pages/auth/Verify";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/verify",
    element: <VerifyPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
