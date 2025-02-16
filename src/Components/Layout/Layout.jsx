import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
