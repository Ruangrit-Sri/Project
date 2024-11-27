import HomePage from "@/pages/home";
import MainLayout from "@/components/layouts/layout.main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "@/components/layouts/layout.error404";
import CategoriesPage from "@/pages/category";
import AdminPage from "@/pages/admin";
import AdminProjectPage from "@/pages/project";
import Login from "@/pages/login";


const router = createBrowserRouter([  
  {
    path: "/login",
    element: <Login/>
  },

  {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
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
        path: "*",
        element: <Error404 />,
    },
])


export default function Router() {
    return <RouterProvider router={router} />;
}