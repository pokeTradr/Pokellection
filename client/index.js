import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/Card";
import styles from './styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Root</div>
  },
  {
    path: "/home",
    element: <div>Home</div>
  },
  {
    path: "/card",
    element: <Card />
  },
  {
    path: "/profile",
    element: <div>Profile</div>
  },
  {
    path: "/signup",
    element: <div>signup</div>
  },
  {
    path: "/login",
    element: <div>Login</div>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);