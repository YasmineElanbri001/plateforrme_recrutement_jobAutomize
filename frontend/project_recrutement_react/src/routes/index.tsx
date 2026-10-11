// import { createBrowserRouter } from "react-router-dom";
// import Layout from "../components/Layout";
// import Home from "../pages/home";
// import Login from "../components/authentification/LoginComponent";
// import Registration from "../components/authentification/Register";
// import Register from "../pages/Register";
// import MainLayout from "../layout/MainLayout";
// import Login from "../pages/Login";
// import Product from "./../pages/Product";
// import ProtectedRoute from "../components/auth/ProtectedRoute";
// import Dashboard from "../dashboard/Dashboard";
// import Unauthorized from "../pages/Unauthorized";
// import Home from "./../pages/Home";
// import RoleBasedProtectedRoute from "../components/auth/RoleBasedProtectedRoute";

// import { Component } from "react"
// import { Outlet } from "react-router-dom"

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/register",
      //   element: <Registration />,
      // },
      // {
      //   path: "/product",
      //   element: (
      //     <ProtectedRoute>
      //       <Product />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard",
      //   element: (
      //     <RoleBasedProtectedRoute allowedRole={["ADMIN"]}>
      //       <Dashboard />
      //     </RoleBasedProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/unauthorized",
      //   element: <Unauthorized />,
      // },
//     ],
//   },
// ]);



// const ProtectedRoute = () => {

//   const user = null 
//   return  user ?  <Outlet /> : <Component to="/login" />

// }

// export default ProtectedRoute