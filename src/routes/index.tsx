import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import VerifyPage from "@/pages/auth/Verify";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/dashboard/Dashboardpage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import LinksPage from "@/pages/dashboard/LinksPage";
import LinkDetailPage from "@/pages/dashboard/LinksDetailsPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import TwoFAVerifyPage from "@/pages/auth/TwoFAVerifyPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}

// Prevent authenticated users from accessing the 2FA page directly
// without a valid sessionKey — the page itself handles missing state,
// but this guards the route at the router level too.
// function RequireSessionKey({ children }: { children: React.ReactNode }) {
//   const token = localStorage.getItem("accessToken");
//   // If already fully authenticated, skip 2FA screen
//   if (token) return <Navigate to="/dashboard" replace />;
//   return <>{children}</>;
// }

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
    path: "/auth/2fa",
    element: (
      // <RequireSessionKey>
      <TwoFAVerifyPage />
      // </RequireSessionKey>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      { path: "links", element: <LinksPage /> },
      {
        path: "links/:slug",
        element: <LinkDetailPage />,
      },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
