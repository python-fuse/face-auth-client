import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import { DashboardLayout } from "@/layouts/dashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      // { path: "students", element: <StudentsPage /> },
      // { path: "staff", element: <StaffPage /> },
      // { path: "faculties", element: <FacultiesPage /> },
      // { path: "departments", element: <DepartmentsPage /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
