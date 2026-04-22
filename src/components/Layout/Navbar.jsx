import { useContext } from "react";
import CategoryMenu from "../Categories/CategoryMenu";
import { Link, NavLink } from "react-router-dom";
import CartContext from "../../store/cart-context";

const NavBar = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div className="container-fluid bg-dark mb-30">
      <div className="row px-xl-5">
        <CategoryMenu />
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase text-dark bg-light px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                Shop
              </span>
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/categories"
                  className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`}
                >
                  Shop
                </NavLink>

                <NavLink
                  to="/cart"
                  className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`}
                >
                  Shopping Cart
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-item nav-link${isActive ? " active" : ""}`}
                >
                  Contact
                </NavLink>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <a href="/temp" className="btn px-0">
                  <i className="fas fa-heart text-primary"></i>
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: "2px" }}
                  >
                    0
                  </span>
                </a>
                <Link to="/cart" className="btn px-0 ml-3">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: "2px" }}
                  >
                    {cartCtx.numItems}
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
