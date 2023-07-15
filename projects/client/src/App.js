import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import LoginPage from "./pages/Login";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./features/authSlice";
import RegisterPage from "./pages/Register";
import SetEmployeeInfo from "./pages/SetEmployeeInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/access",
    element: <SetEmployeeInfo />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  },);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
