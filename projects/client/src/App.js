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

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
