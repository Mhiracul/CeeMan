import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/svg/Ceeman logo white BLUE 1.svg";
import { IoCartOutline } from "react-icons/io5";
import { logout } from "../actions/authActions";
function Navbar() {
  const { cartTotalQuantity } = useSelector((state) => state.cart || {});
  const [showNav, setShowNav] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowNav(!showNav);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="w-full z-10 !bg-transparent py-[1rem] px-[2rem]">
        <nav className="rounded-lg bg-[#2544D8] py[-1rem] shadow-custom">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="md:h-14 h-8 mr-3" alt="Ceeman Logo" />
              <span className="self-center specialText text-3xl font-semibold whitespace-nowrap dark:text-white"></span>
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              onClick={() => toggleMenu()}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className={`w-full md:block md:w-auto ${
                !showNav ? "hidden" : ""
              }`}
              id="navbar-default"
            >
              <ul className="font-medium text-[1.rem] flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0 md:bg-transparent bg-[#2544D8] dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pl-3 pr-4 text-white bg-cyan-400 rounded md:bg-transparent md:text-cyan-400 md:p-0 dark:text-white md:dark:text-[#E8998D] transition-all duration-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agent"
                    className="block py-2 pl-3 pr-4 border-white border text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-2 md:px-4 md:py-2 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] md:dark:hover:bg-white transition-all ease-in-out duration-1000 hover:px-5 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Become an Agent
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/signin"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/check"
                    className="flex justify-start items-center font-bold py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#C7E8F3] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                  >
                    <IoCartOutline />

                    <span className="ml-1 px-2 text-left rounded-full bg-[#E8998D]">
                      {cartTotalQuantity}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
