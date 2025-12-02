import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import JoinHRManager from "../pages/JoinHRManager/JoinHRManager";
import Login from "../pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import AddAsset from "../pages/Dashboard/HR/AddAsset/AddAsset";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'joinEmployee',
          element: <JoinEmployee></JoinEmployee>
        },
        {
          path: 'joinHRManager',
          element: <JoinHRManager></JoinHRManager>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
    ]
  },
  // Dashboard Layout
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "add-asset",
        element: <AddAsset></AddAsset>
      }
    ]
  }
]);