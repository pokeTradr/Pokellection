import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card from "./components/Card.jsx";
import Collections from "./components/Collections.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx"
import './styles.css'

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
    element: <Collections />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);