import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { createBrowserRouter,RouterProvider,Route, Outlet, Navigate } from "react-router-dom";
import NavBar from "./parts/navBar/NavBar";
import LeftBar from "./parts/leftBar/LeftBar";
import RightBar from "./parts/rightBar/RightBar";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";//it is used to fetch the data based on query
function App() {

const {currentUser}=useContext(AuthContext);//here we pass user details when user logged in

const {darkMode}=useContext(DarkModeContext);

const queryClient=new QueryClient()

function Layout(){
  return(
    <QueryClientProvider client={queryClient}>
    <div className={`theme-${darkMode ? "dark":"light"}`}>
      <NavBar />
      <div style={{display:"flex"}}>
      <LeftBar />
      <div style={{flex:6}}>
      <Outlet />
      </div>
      <RightBar />
      </div>
    </div>
    </QueryClientProvider>
  );
};

// this below part is used to protect the route

function ProtectedRoute({children}){
  if(!currentUser){
    return <Navigate to="/login" />
  }
  return children; //it refer to the children of layout() i.e. profile and home page
};

  // below before return statement, it shows how  to move from one page to another
  // createBrowserRouter function consist of array of objects having two paramters
  // path and element
  // path:it tell on which page to move 
  // element : it tell what to show on that reached page 
  
  
  const router=createBrowserRouter([
    {//for '/' page
      path:"/",
      element:
        (//part of protecting route 
        // where to check if user is logged in or not
        <ProtectedRoute>
        <Layout />
        </ProtectedRoute>
        ),
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/profile/:id",
          element:<Profile />
        }
      ]
    },
    { //for login page
      path:"/login",
      element:<Login />
    },
    {//for register page
      path:"/register",
      element:<Register />
    }
  ]);

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
