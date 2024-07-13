import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/Ceeman logo white BLUE 1.svg";
import { IoCartOutline } from "react-icons/io5";
import { logout } from "../actions/authActions";
import { fetchTotalCartItems } from "../actions/cartActions";
import { viewProducts } from "../actions/productActions";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const { totalCartItems } = useSelector((state) => state.cart || {});

  useEffect(() => {
    dispatch(viewProducts());
    dispatch(fetchTotalCartItems()); // Fetch total cart items on component mount
  }, [dispatch]);

  useEffect(() => {
    console.log("Total Cart Items:", totalCartItems); // Log totalCartItems
  }, [totalCartItems]); // Log whenever totalCartItems changes

  const toggleMenu = () => {
    setShowNav(!showNav);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const getNavLinkClass = (isActive) =>
    isActive ? "text-[#E8998D]" : "text-gray-900";

  return (
    <>
      <div className="w-full z-10 !bg-transparent py-[1rem] md:px-[2rem] px-4">
        <nav className="rounded-lg bg-[#2544D8] py[-1rem] shadow-custom">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
            <NavLink to="/" className="flex items-center">
              <img src={Logo} className="md:h-14 h-8 mr-3" alt="Ceeman Logo" />
              <span className="self-center specialText text-3xl font-semibold whitespace-nowrap dark:text-white"></span>
            </NavLink>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              onClick={() => toggleMenu()}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
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
              <ul className="font-medium md:text-sm text-xs flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0 md:bg-transparent bg-[#2544D8] dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className={`block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white md:text-[#E8998D] transition-all duration-700 ${getNavLinkClass(
                      true
                    )}`}
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-white md:text-[#E8998D] transition-all duration-700 ${getNavLinkClass(
                      false
                    )}`}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-white md:text-[#E8998D] transition-all duration-700 ${getNavLinkClass(
                      false
                    )}`}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/agent"
                    className={({ isActive }) =>
                      `block py-1 px-1 md:mb-0 mb-3 border-white border rounded hover:bg-gray-100 md:hover:bg-transparent md:border-2 md:px-2 md:py-1 md:hover:text-cyan-400 md:p-0 dark:text-white md:dark:hover:text-[#E8998D] md:dark:hover:bg-white transition-all ease-in-out duration-1000 hover:px-5 dark:hover:text-white md:dark:hover:bg-transparent ${getNavLinkClass(
                        { isActive }
                      )}`
                    }
                  >
                    Become a Distributor
                  </NavLink>
                </li>
                {isAuthenticated ? (
                  <li className="bg-white px-3 py-1 text-[#2544D8]">
                    <button
                      onClick={handleLogout}
                      className="block py-2 pl-3 pr-4 text-gray-900 bg-white shadow-sm rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 dark:text-black md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li className="bg-white px-3 py-1 text-[#2544D8]">
                    <NavLink
                      to="/signin"
                      className={({ isActive }) =>
                        `block md:py-2 py-1 px-3 hover:bg-gray-100 text-xs  shadow-sm  md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 text-[#2544D8] md:dark:hover:text-[#E8998D] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-700 ${getNavLinkClass(
                          { isActive }
                        )}`
                      }
                    >
                      Sign In
                    </NavLink>
                  </li>
                )}
                <li class="font-sans flex items-center   mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-sm text-white ">
                  <a
                    href="/check"
                    role="button"
                    class="relative flex max-w-[50px]"
                  >
                    <IoCartOutline className="" size={28} />
                    <span className="absolute right-0  top-0 rounded-full flex justify-center items-center bg-white w-4 h-4 top right p-0 m-0 text-black font-mono text-[9px]  leading-tight text-center">
                      {totalCartItems !== null && totalCartItems !== undefined
                        ? totalCartItems
                        : 0}
                    </span>
                  </a>
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
