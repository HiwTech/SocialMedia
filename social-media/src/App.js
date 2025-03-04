import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./Component/navBar/NavBar";
import LeftBar from "./Component/leftBar/LeftBar";
import RightBar from "./Component/rightBar/RightBar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import './style.scss'
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/authContext";
import {
  QueryClient,
  QueryClientProvider,

} from "@tanstack/react-query";


const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()

    
  return (
    <QueryClientProvider client={queryClient}>
      <div className={darkMode ? "theme-dark" : "theme-light"}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    </QueryClientProvider>
  );
};

const ProtectedRoute = ({ children }) => {
   const { currentUser, login } = useContext(AuthContext);
   //console.log(currentUser);
  // const currentUser = true; // Mocked user state
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> }, // Default route in "/"
      { path: "profile/:id", element: <Profile /> }, // Nested route
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  const {darkMode} = useContext(DarkModeContext)
   const { currentUser } = useContext(AuthContext);
   //console.log(currentUser);
  
  return <RouterProvider router={router} />;
}

export default App;
