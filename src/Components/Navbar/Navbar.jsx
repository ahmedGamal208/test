import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { numOfItems } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pageTitles = {
    "/": "Fresh Cart",
    "/cart": "Cart",
    "/wishlist": "Wishlist",
    "/products": "Products",
    "/category": "Categories",
    "/brands": "Brands",
    "/allorders": "All Orders",
    "/login": "Login",
    "/register": "Register",
    "/reset-password": "Reset Password",
    "/payment": "Payment",
    "/productDetails:id": "Product Details",
  };

  // Updates window tab title
  useEffect(() => {
    document.title = pageTitles[location.pathname] || "Page Not Found";
  }, [location.pathname]);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#F8F9FA] border-gray-200 fixed top-0 left-0 w-full z-50 shadow-md px-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <i className="fa-solid fa-cart-shopping nav-icon text-[#4FA74F] text-[2rem]"></i>
          <span className="self-center text-2xl whitespace-nowrap font-semibold text-[1.75rem]">
            fresh cart
          </span>
        </NavLink>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col lg:flex-row p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            {token && (
              <>
                {[
                  { to: "/", label: "Home" },
                  { to: "/cart", label: "Cart" },
                  { to: "/wishlist", label: "Wishlist" },
                  { to: "/products", label: "Products" },
                  { to: "/category", label: "Categories" },
                  { to: "/brands", label: "Brands" },
                  { to: "/allorders", label: "All Orders" },
                ]?.map(({ to, label }) => (
                  <li key={to} className="relative">
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-sm lg:p-0 transition-colors duration-200 text-center ${
                          isActive
                            ? "  text-[#4FA74F]"
                            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4FA74F]"
                        }`
                      }
                    >
                      {label}
                      {to === "/cart" && numOfItems > 0 && (
                        <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4">
                          {numOfItems}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col items-center lg:flex-row p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            {token ? (
              <button
                onClick={logout}
                className="block py-2 px-3  rounded-sm md:bg-transparent text-red-700 md:p-0"
              >
                Logout
              </button>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm lg:p-0 transition-colors duration-200 ${
                        isActive
                          ? " text-[#4FA74F]"
                          : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4FA74F]"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm lg:p-0 transition-colors duration-200 ${
                        isActive
                          ? "  text-[#4FA74F]"
                          : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4FA74F]"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
