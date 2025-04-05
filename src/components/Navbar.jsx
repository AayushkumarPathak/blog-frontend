import React from "react";
import logoMine from "../assets/mineLogo.png";
import { Link, useNavigate } from "react-router";
import { doLogout } from "../auth";
import { toast } from "react-toastify";
function Navbar() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loginToken"))?.user || null;
  const logoutUser = () => {
    doLogout(() => {
      //user is logged out
      navigate("/login");
      toast.success("Logged out successfully");
    });
  };
  return (
    <div>
      <nav className="bg-gray-800 border-gray-900 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center  border-none space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logoMine}
              className="h-12 w-16 rounded-lg "
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
              Mine Blog's
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
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
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border text-white border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user && (
                <>
                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>

                    <Link
                      to={"/user/dashboard"}
                      className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white-700 active:text-blue-300 md:p-0 md:dark:text-white dark:bg-blue-600 hover:text-yellow-400 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <Link
                      to={"/user/profile"}
                      className="block py-2 px-3 font-semibold text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="flex text-white hover:text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>

                    <button
                      onClick={logoutUser}
                      className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <>
                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>

                    <Link
                      to={"/"}
                      className="block py-2 px-3 text-white bg-gray-800 rounded md:bg-transparent hover:text-blue-500 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6 mr-2"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M169 57v430h78V57zM25 105v190h46V105zm158 23h18v320h-18zm128.725 7.69l-45.276 8.124l61.825 344.497l45.276-8.124zM89 153v270h62V153zm281.502 28.68l-27.594 11.773l5.494 12.877l27.594-11.773zm12.56 29.433l-27.597 11.772l5.494 12.877l27.593-11.772l-5.492-12.877zm12.555 29.434l-27.594 11.77l99.674 233.628l27.594-11.773zM25 313v30h46v-30zm190 7h18v128h-18zM25 361v126h46V361zm64 80v46h62v-46z"
                      ></path>
                    </svg>

                    <Link
                      to={"/blogfeed"}
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent hover:text-blue-500 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Blogs Feed
                    </Link>
                  </li>

                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <Link
                      to={"/signup"}
                      className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="flex text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                      />
                    </svg>

                    <Link
                      to={"/login"}
                      className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
