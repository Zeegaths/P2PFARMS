// src/App.jsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import createBrowserRouter and RouterProvider
import Landing from "./components/Landing";
import UserForm from "./components/UserForm";
import AgentForm from "./components/AgentForm";
import FarmerForm from "./Dashboards/RegisterFarmer";
import ProductList from "./components/ProductList";
import UserType from "./components/UserType";
import OrderStatus from "./components/OrderStatus";
import { AuthProvider } from "./lib/AuthContext";
import Explore from "./components/Explore";
import Favorites from "./components/Favorites";
import Settings from "./components/Settings";
import FarmersList from "./Dashboards/FarmerList";
import AgentsList from "./Dashboards/AgentList";
import AllFarmers from "./Dashboards/AllFarmers";
import PermissionedUsers from "./Dashboards/PermissionedUsers";

// Create the router with path-to-component mappings
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />, 
  },
  {
    path: "/registeruser",
    element: <UserForm />,
  },
  {
    path: "/registeragent",
    element: <AgentForm/>,
  },
  {
    path: "/addfarmer",
    element: <FarmerForm />,
  },

  {
    path: "/usertype",
    element: <UserType />,
  },
  {
    path: "/productlist",
    element: <ProductList />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/orderstatus",
    element: <OrderStatus />,
  },
  {
    path: "/farmerslist",
    element: <FarmersList />,
  },
  {
    path: "/agentslist",
    element: <AgentsList />,
  },
  {
    path: "/allfarmers",
    element: <AllFarmers />,
  },
  {
    path: "/permissions",
    element: <PermissionedUsers />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />{" "}
        {/* Use RouterProvider with the created router */}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
