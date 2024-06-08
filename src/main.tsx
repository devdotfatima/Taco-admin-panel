import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Trucks from "./pages/Trucks.tsx";
import Profile from "./pages/Profile.tsx";
import TruckOwners from "./pages/TruckOwners.tsx";
import { store } from "./redux/store.ts";
import TruckDetails from "./pages/TruckDetails.tsx";
import MenuItemDetail from "./pages/MenuItemDetail.tsx";
import Login from "./pages/Auth/Login.tsx";
import PublicRoute from "./pages/Auth/PublicRoute.tsx";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.tsx";
import TruckOwnerDetail from "./pages/TruckOwnerDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/trucks",
            element: <Trucks />,
          },
          {
            path: "/customers",
            element: <TruckOwners />,
          },
          {
            path: "/supervisors",
            element: <TruckOwners />,
          },

          {
            path: "/menu/:menuItemId",
            element: <MenuItemDetail />,
          },
          {
            path: "/trucks/:truckId",
            element: <TruckDetails />,
          },

          {
            path: "/owners",
            element: <TruckOwners />,
          },
          {
            path: "/owners/:truckOwnerId",
            element: <TruckOwnerDetail />,
          },

          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PrimeReactProvider>
        <Toaster />
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </ReduxProvider>
  </React.StrictMode>
);
