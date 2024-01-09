import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import ProtectedLayout from "./components/ProtectedLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register.jsx";
import Users from "./pages/Users.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path: "/Orders",
        element: <Orders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>

          <RouterProvider router={router}></RouterProvider>

      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
