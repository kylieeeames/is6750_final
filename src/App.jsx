import "./App.css";

import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { checkoutAction } from "./pages/CheckoutPage";
import { contactAction } from "./pages/ContactPage";
import { ProductContextProvider } from "./store/product-context";
import {
  authStatusLoader,
  loginAction,
  logoutLoader,
  signupAction,
} from "./utils/auth";

const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ProductsByCategoryPage = lazy(() => import("./pages/ProductsByCategoryPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LazyErrorPage = lazy(() => import("./pages/ErrorPage"));

const loadingFallback = (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "120px" }}>
    <TailSpin height="50" width="50" color="#ffc107" ariaLabel="loading" />
  </div>
);

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Layout />,
    loader: authStatusLoader,
    errorElement: (
      <Suspense fallback={loadingFallback}>
        <LazyErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "categories",
        element: (
          <Suspense fallback={loadingFallback}>
            <CategoriesPage />
          </Suspense>
        ),
      },
      {
        path: "products/category/:categoryname",
        element: (
          <Suspense fallback={loadingFallback}>
            <ProductsByCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "products/:productid",
        element: (
          <Suspense fallback={loadingFallback}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={loadingFallback}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={loadingFallback}>
            <CheckoutPage />
          </Suspense>
        ),
        action: checkoutAction,
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={loadingFallback}>
            <ContactPage />
          </Suspense>
        ),
        action: contactAction,
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={loadingFallback}>
            <SignUpPage />
          </Suspense>
        ),
        action: signupAction,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={loadingFallback}>
            <LoginPage />
          </Suspense>
        ),
        action: loginAction,
      },
      { path: "logout", loader: logoutLoader },
      {
        path: "*",
        element: (
          <Suspense fallback={loadingFallback}>
            <LazyErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ProductContextProvider>
      <RouterProvider router={router} />
    </ProductContextProvider>
  );
}

export default App;
