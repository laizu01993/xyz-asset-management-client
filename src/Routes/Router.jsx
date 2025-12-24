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
import HRRoute from "./HRRoute";
import HRHome from "../pages/Dashboard/HR/HRHome/HRHome";
import AssetList from "../pages/Dashboard/HR/AssetList/AssetList";
import AllRequests from "../pages/Dashboard/HR/AllRequests/AllRequests";
import EmployeeList from "../pages/Dashboard/HR/EmployeeList/EmployeeList";
import AddEmployee from "../pages/Dashboard/HR/AddEmployee/AddEmployee";
import HRProfile from "../pages/Dashboard/HR/HRProfile/HRProfile";
import EmployeeRoute from "./EmployeeRoute";
import EmployeeHome from "../pages/Dashboard/Employee/EmployeeHome/EmployeeHome";
import MyAssets from "../pages/Dashboard/Employee/MyAssets/MyAssets";
import MyTeam from "../pages/Dashboard/Employee/MyTeam/MyTeam";
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset/RequestAsset";
import EmployeeProfile from "../pages/Dashboard/Employee/EmployeeProfile/EmployeeProfile";
import UpdateAsset from "../pages/Dashboard/HR/UpdateAsset/UpdateAsset";


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
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      // Admin Routes
      {
        path: "hrHome",
        element: <HRRoute><HRHome></HRHome></HRRoute>
      },
      {
        path: "assetLists",
        element: <HRRoute><AssetList></AssetList></HRRoute>
      },
      {
        path: "addAsset",
        element: <HRRoute><AddAsset></AddAsset></HRRoute>
      },
      {
        path: "updateAsset/:id",
        element: <HRRoute><UpdateAsset></UpdateAsset></HRRoute>
      }, 
      {
        path: "allRequests",
        element: <HRRoute><AllRequests></AllRequests></HRRoute>
      },
      {
        path: "employeeLists",
        element: <HRRoute><EmployeeList></EmployeeList></HRRoute>
      },
      {
        path: "addEmployee",
        element: <HRRoute><AddEmployee></AddEmployee></HRRoute>
      },
      {
        path: "hrProfile",
        element: <HRRoute><HRProfile></HRProfile></HRRoute>
      },
      // Employee Routes
      {
        path: "employeeHome",
        element: <EmployeeRoute><EmployeeHome></EmployeeHome></EmployeeRoute>
      },
      {
        path: "myAssets",
        element: <EmployeeRoute><MyAssets></MyAssets></EmployeeRoute>
      },
      {
        path: "myTeam",
        element: <EmployeeRoute><MyTeam></MyTeam></EmployeeRoute>
      },
      {
        path: "requestAsset",
        element: <EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute>
      },
      {
        path: "employeeProfile",
        element: <EmployeeRoute><EmployeeProfile></EmployeeProfile></EmployeeRoute>
      }
    ]
  }
]);