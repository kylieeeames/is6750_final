import { useContext } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import CartContext from "../../store/cart-context";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userData = useRouteLoaderData("root");

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
          {cartCtx.items.length === 0 ? (
            <div className="bg-light p-30">
              <p className="mb-2">Your cart is currently empty.</p>
              <Link to="/categories">Browse categories to start shopping.</Link>
            </div>
          ) : (
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartCtx.items.map((item) => (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />{" "}
                      {item.title}
                    </td>
                    <td className="align-middle">${item.price.toFixed(2)}</td>
                    <td className="align-middle" style={{ maxWidth: "130px" }}>
                      <input
                        type="number"
                        min="1"
                        className="form-control bg-secondary border-0 text-center"
                        value={item.quantity}
                        onChange={(event) => {
                          const nextQuantity = Number(event.target.value);
                          cartCtx.updateItemQuantity(item.id, nextQuantity > 0 ? nextQuantity : 1);
                        }}
                      />
                    </td>
                    <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cartCtx.removeItem(item.id)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="col-lg-4">
          <div className="bg-light p-30 mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-light pr-3">Cart Summary</span>
            </h5>
            <div className="border-bottom pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>${cartCtx.subtotal.toFixed(2)}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">${cartCtx.shipping.toFixed(2)}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>${cartCtx.total.toFixed(2)}</h5>
              </div>

              {userData ? (
                <Link to="/checkout" className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                  Proceed To Checkout
                </Link>
              ) : (
                <div className="mt-3">
                  <p className="mb-2">Please sign up or login to checkout.</p>
                  <Link to="/signup?redirectTo=%2Fcart" className="mr-2">
                    Sign up
                  </Link>
                  <Link to="/login?redirectTo=%2Fcart">Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
