import { Form } from "react-router-dom";

const CheckoutForm = ({ actionData, cartCtx }) => {
  return (
    <div className="row px-xl-5">
      <div className="col-lg-8 mb-5">
        <div className="bg-light p-30">
          <h4 className="mb-4">Checkout</h4>
          {actionData ? (
            <div
              className={`alert ${actionData.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {actionData.message}
            </div>
          ) : null}
          <Form method="post" noValidate={false}>
            <h5 className="mb-3">Billing Address</h5>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="billingFirstName" type="text" placeholder="First Name" required />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="billingLastName" type="text" placeholder="Last Name" required />
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" name="billingEmail" type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <input className="form-control" name="billingAddress" type="text" placeholder="Address" required />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="billingCity" type="text" placeholder="City" required />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="billingState" type="text" placeholder="State" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="billingZip" type="text" placeholder="Zip" required />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="billingCountry" type="text" placeholder="Country" required />
              </div>
            </div>

            <h5 className="mb-3 mt-4">Shipping Address</h5>
            <p className="mb-2">Leave shipping fields blank to copy billing info.</p>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingFirstName" type="text" placeholder="First Name" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingLastName" type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" name="shippingEmail" type="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input className="form-control" name="shippingAddress" type="text" placeholder="Address" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingCity" type="text" placeholder="City" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingState" type="text" placeholder="State" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingZip" type="text" placeholder="Zip" />
              </div>
              <div className="form-group col-md-6">
                <input className="form-control" name="shippingCountry" type="text" placeholder="Country" />
              </div>
            </div>

            <h5 className="mb-3 mt-4">Payment</h5>
            <div className="form-group">
              <select className="custom-select" name="paymentType" defaultValue="Cash On Delivery">
                <option>Cash On Delivery</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
              </select>
            </div>

            <button className="btn btn-primary btn-block font-weight-bold py-3" type="submit">
              Place Order
            </button>
          </Form>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="bg-light p-30 mb-5">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-light pr-3">Order Summary</span>
          </h5>
          <div className="d-flex justify-content-between mb-3">
            <h6>Items</h6>
            <h6>{cartCtx.items.length}</h6>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>${cartCtx.subtotal.toFixed(2)}</h6>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h6>Shipping</h6>
            <h6>${cartCtx.shipping.toFixed(2)}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>${cartCtx.total.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;