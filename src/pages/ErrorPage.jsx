import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const message =
    (error && typeof error === "object" && "message" in error && error.message) ||
    "Sorry, this page could not be found.";

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <div className="col-12">
          <div className="bg-light p-30">
            <h4 className="mb-3">Page not found</h4>
            <p className="mb-3">Sorry, this page could not be found.</p>
            {message && message !== "Sorry, this page could not be found." ? (
              <p className="mb-3 text-muted">{message}</p>
            ) : null}
            <div className="d-flex gap-2 flex-wrap">
              <Link className="btn btn-primary" to="/">
                Back to Home
              </Link>
              <Link className="btn btn-outline-primary" to="/categories">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;