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

const router = createBrowserRouter([
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
        path: "/trucks/:truckId",
        element: <TruckDetails />,
      },
      {
        path: "/owners",
        element: <TruckOwners />,
      },
      {
        path: "/owners/:truckOwnerId",
        element: <Trucks />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
