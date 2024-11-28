// Manager
import Dashboard from "@/pages/managerdashboard";
import Planning from "@/pages/managertask";
import Resource from "@/pages/managerresoue";
import Report from "@/pages/managerreport";

// Navbar Sidebar
import MainLayout from "@/components/layouts/layout.main";
import MainLayoutManager from "@/components/layouts/layout.manager";

// React
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Error
import Error404 from "@/components/layouts/layout.error404";

//templet
import CategoriesPage from "@/pages/category";

// Admin
import AdminPage from "@/pages/admin";
import AdminProjectPage from "@/pages/project";

// login
import Login from "@/pages/login";


const router = createBrowserRouter([  
    {
      index: true,
      element: <Login />,
    },

  {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/categories",
          element: <CategoriesPage />,
        },
        {
          path: "/admin",
          element: <AdminPage/>
        },
        {
          path: "/adminproject",
          element: <AdminProjectPage/>
        }
      ],
  },

  {
    path: "/",
    element: <MainLayoutManager />,
    children: [
      {
        path: "/ManagerDash",
        element: <Dashboard />,
      },
      {
        path: "/ManagerPlan",
        element: <Planning />,
      },
      {
        path: "/ManagerResource",
        element: <Resource />,
      },
      {
        path: "/ManagerReport",
        element: <Report />,
      },
    ],
},
   
  {
      path: "*",
      element: <Error404 />,
  },
])


export default function Router() {
    return <RouterProvider router={router} />;
}