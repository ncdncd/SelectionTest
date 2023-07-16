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
import HomePage from "./pages/Home";
import ClockPage from "./pages/ClockPage";
import AttendanceLog from "./pages/AttendanceLog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
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
  {
    path: "/clock",
    element: <ClockPage />,
  },
  {
    path: "/log",
    element: <AttendanceLog />,
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
