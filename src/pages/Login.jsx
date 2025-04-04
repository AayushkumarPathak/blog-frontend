import React, { useState, useEffect } from "react";
import PublicNav from "../components/PublicNav";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../services/userService.js";
import { doLogin } from "../auth/index.js";

function Login() {
  // const [loggedIn, setLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const userName = formData.username;
  // localStorage.setItem("username", userName);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    try {
      if (formData.username.trim() === "" || formData.password.trim() === "") {
        toast.error("Please fill all the fields");
        return;
      }
      if (formData.username.includes("@") == false) {
        toast.error("Please provide valid email");
        return;
      }

      // Backend API call
      login(formData)
        .then((jwtToken) => {
          console.log("JWT Token:", jwtToken);
          doLogin(jwtToken, () => {
            console.log("jwt saved to local storage");
          });
          toast.success("Login Success");
          navigate("/user/dashboard");
        })
        .catch((err) => {
          console.log("Error:", err);
          if (
            err?.response?.status === 400 ||
            err?.response?.status === 404 ||
            err?.response?.status === 500
          ) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Something went wrong!");
          }
        });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/dashboard");
  //   }
  // }, [loggedIn, navigate]);
  return (
    <>
      <PublicNav />

      <div>
        <div
          className="flex justify-center items-center h-screen"
          id="loginDiv"
        >
          <form
            noValidate
            onSubmit={handleLogin}
            className="border-y-4 border-yellow-400 sm:w-full max-w-lg  p-8 shadow-md rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          >
            <div className="text-center text-2xl font-semibold mb-4">
              Login Here
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john@dev.in"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="[A-Za-z0-9#$]"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white border-gray-800 border-x-2 border-y-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
