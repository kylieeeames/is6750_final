import TopBar from "./TopBar";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Layout = () => {
  const navigation = useNavigation();
  const isBusy = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <>
      {isBusy ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "120px" }}
        >
          <TailSpin height="50" width="50" color="#ffc107" ariaLabel="loading" />
        </div>
      ) : null}
      <TopBar />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;