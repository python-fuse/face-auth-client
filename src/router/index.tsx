import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { DashboardLayout } from "@/layouts/dashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      // { path: "/", element: <DashboardPage /> },
      // { path: "students", element: <StudentsPage /> },
      // { path: "staff", element: <StaffPage /> },
      // { path: "faculties", element: <FacultiesPage /> },
      // { path: "departments", element: <DepartmentsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
