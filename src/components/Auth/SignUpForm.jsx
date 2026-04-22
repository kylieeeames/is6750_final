import { Form } from "react-router-dom";

const SignUpForm = ({ actionData }) => {
  return (
    <div className="col-lg-7 mb-5">
      <div className="bg-light p-30">
        <h4 className="mb-4">Create Account</h4>
        {actionData ? (
          <div
            className={`alert ${actionData.success ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {actionData.message}
          </div>
        ) : null}
        <Form method="post" noValidate={false}>
          <div className="control-group mb-3">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div className="control-group mb-3">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="control-group mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="control-group mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
          <div>
            <button className="btn btn-primary py-2 px-4" type="submit">
              Sign Up
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
