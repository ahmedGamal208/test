import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Error from "./Components/Error/Error";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Wishlist from "./Components/Wishlist/Wishlist";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Components/Context/CartContext";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AuthContextProvider from "./Components/Context/AuthContext";
import WishlistContextProvider from "./Components/Context/WishlistContext";
import ProtectedResetPassword from "./Components/ProtectedResetPassword/ProtectedResetPassword";

function App() {
  const x = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
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
          path: "/productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <ProtectedRoute>
              <Payment />
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
          path: "/reset-password",
          element: (
            <ProtectedResetPassword>
              <ResetPassword />
            </ProtectedResetPassword>
          ),
        },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <Toaster />
            <RouterProvider router={router} />
          </CartContextProvider>
        </WishlistContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
