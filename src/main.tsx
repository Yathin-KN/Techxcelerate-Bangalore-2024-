import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignupPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import Assessment from "./pages/Assessment";
import { Dashboard } from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Blogs from "./pages/Blogs";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/assessment",
    element: <Assessment />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider store={store}>
    <RouterProvider router={router} />
  </AuthProvider>
);
