import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import RootLayout from "./RootLayout.tsx";
import AuthLayout from "./components/auth/AuthLayout.tsx";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import { redirectIfNoUser, redirectIfUser } from "./utils/auth.ts";
import PlaceList from "./components/PlaceList.tsx";
import CreatePlace from "./components/CreatePlace.tsx";
import EditPlace from "./components/EditPlace.tsx";
import PlaceDetail from "./components/PlaceDetail.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:uid/places",
        element: <PlaceList />,
      },
      {
        path: "/places/new",
        element: <CreatePlace />,
        loader: redirectIfNoUser,
      },
      {
        path: "/places/:pid",
        element: <PlaceDetail />,
      },
      {
        path: "/places/:pid/edit",
        element: <EditPlace />,
        loader: redirectIfNoUser,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            loader: redirectIfUser,
          },
          {
            path: "signup",
            element: <Signup />,
            loader: redirectIfUser,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
