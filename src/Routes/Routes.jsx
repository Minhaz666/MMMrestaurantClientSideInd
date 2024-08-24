import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import OurShop from "../Pages/Shop/OurShop";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import UpdateItems from "../Pages/Dashboard/UpdateItems/UpdateItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element:<Main></Main> ,
            children:
                [
                    
                        {
                            path: '/',
                            element:<Home></Home>
                        },

                        {
                            path:'menu',
                            element:<Menu></Menu>,
                        },
                        {
                            path:'ourshop',
                            element:<OurShop></OurShop>,
                        },
                        {
                            path:'ourshop/:category',
                            element:<OurShop></OurShop>,
                        },
                        {
                            path:'login',
                            element:<Login></Login>
                        },
                    
                        {
                            path:'signup',
                            element:<SignUp></SignUp>
                        },
                    
                ]
        },
      {
        path: '/dashboard',
        element:<DashBoard></DashBoard>,
        children:[
            {
                path: '/dashboard/cart',
                element: <Cart></Cart>
            },
            {
                path: '/dashboard/payment',
                element:<Payment></Payment>
            }
            ,
            {
                path: '/dashboard/paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            }
            ,
            {
                path: '/dashboard/userHome',
                element:<UserHome></UserHome>
            }
            ,
            // for the admin only
            {
                path: '/dashboard/users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/addItem',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: '/dashboard/manageItems',
                element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
            },
            {
                path: '/dashboard/adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: '/dashboard/manageItems/update/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
                loader:({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
                
            },
        ]
      },
    ]
)