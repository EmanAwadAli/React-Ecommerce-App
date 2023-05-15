import React, { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Products from "./components/Products/Products";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Categories from "./components/Categories/Categories";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import WhishList from "./components/WishList/WishList";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Orders/CheckOut";
import AllOrders from "./components/Orders/AllOrders";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import ResetCode from "./components/Authentication/ResetCode";
import ResetPassword from "./components/Authentication/RestPassword";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import jwtDecode from "jwt-decode";
import CartContextProvider from "./components/Context/CartContext";
import WishListContextProvider from "./components/Context/WishlistContext";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [user, setUser] = useState(null);

  // Save logged User Data
  function saveUserData() {
    setUser(jwtDecode(localStorage.getItem("userToken")));
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout user={user} setUser={setUser} />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <SingleProduct />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id",
          element: <CategoryDetails />,
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WhishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/resetCode",
          element: <ResetCode />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer theme="colored" />
        </WishListContextProvider>
      </CartContextProvider>
    </>
  );
}
