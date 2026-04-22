import { useContext } from "react";
import { redirect, useActionData } from "react-router-dom";
import CheckoutForm from "../components/Cart/CheckoutForm";
import CartContext from "../store/cart-context";
import db from "../utils/db";

const CheckoutPage = () => {
  const cartCtx = useContext(CartContext);
  const actionData = useActionData();

  return (
    <div className="container-fluid pt-5">
      <CheckoutForm actionData={actionData} cartCtx={cartCtx} />
    </div>
  );
};

function buildInfo(prefix, formData) {
  return {
    firstName: formData.get(`${prefix}FirstName`) || "",
    lastName: formData.get(`${prefix}LastName`) || "",
    email: formData.get(`${prefix}Email`) || "",
    address: formData.get(`${prefix}Address`) || "",
    city: formData.get(`${prefix}City`) || "",
    state: formData.get(`${prefix}State`) || "",
    zip: formData.get(`${prefix}Zip`) || "",
    country: formData.get(`${prefix}Country`) || "",
  };
}

function createCheckoutAction() {
  return async function checkoutAction({ request }) {
    try {
      const formData = await request.formData();
      const storedUserData = localStorage.getItem("userData");
      const storedCartItems = sessionStorage.getItem("cartItems");

      if (!storedUserData) {
        return {
          success: false,
          message: "Please log in before placing an order.",
        };
      }

      if (!storedCartItems) {
        return {
          success: false,
          message: "Your cart is empty.",
        };
      }

      const userData = JSON.parse(storedUserData);
      const cartItems = JSON.parse(storedCartItems);
      const billingInfo = buildInfo("billing", formData);
      const shippingFields = buildInfo("shipping", formData);
      const shippingInfo = Object.values(shippingFields).some((value) => value !== "")
        ? shippingFields
        : billingInfo;
      const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const shipping = subtotal * 0.1;
      const total = subtotal + shipping;

      const order = {
        userId: userData.localId,
        billingInfo,
        shippingInfo,
        items: cartItems,
        subtotal,
        shipping,
        total,
        orderDate: new Date().toISOString(),
        orderStatus: "pending",
        paymentType: formData.get("paymentType") || "Cash On Delivery",
      };

      await db.post("/orders.json", order);

      sessionStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("cartstoragechange"));

      return redirect("/");
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || error.message || "An unknown error occurred.",
      };
    }
  };
}

export const checkoutAction = createCheckoutAction();

export default CheckoutPage;
