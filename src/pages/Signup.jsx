import React, { useState } from "react";
import PublicNav from "../components/PublicNav";
import { useNavigate } from "react-router";
import { signup } from "../services/userService";
import { toast } from "react-toastify";
function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setUser({
      email: "",
      password: "",
      name: "",
      about: "",
    });
    setError({
      errors: {},
      isError: false,
    });
  };
  const handleSignup = (e) => {
    try {
      e.preventDefault();
      // if(error.isError){
      //   toast.error("Please resolve the errors");
      //   return;
      // }
      //Backend API call
      if (
        user.email.trim() === "" ||
        user.password.trim() === "" ||
        user.name.trim() === "" ||
        user.about.trim() === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      signup(user)
        .then((res) => {
          console.log("Response:", res);
          console.log("Sign up Success");
          toast.success("Sign up Success");
          setUser({
            email: "",
            password: "",
            name: "",
            about: "",
          });
        })
        .catch((error) => {
          setError({
            errors: error.response.data,
            isError: true,
          });
          console.log("Error:", error?.response?.data);
          toast.error("Sign up Failed");
        });
    } catch (error) {}

    // navigate("/login");
  };
  return (
    <>
      <PublicNav />
      <div className="flex justify-center items-center h-screen" id="loginDiv">
        <form
          noValidate
          onSubmit={handleSignup}
          className="sm:w-full max-w-lg  p-8 shadow-md rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        >
          <div className="text-center text-2xl font-semibold mb-4">
            Register Here
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
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john@dev.in"
              required
            />
            {error.errors.email && (
              <p className="text-red-800 text-sm font-bold ml-1">
                {error?.errors?.email}
              </p>
            )}
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
              value={user.password}
              onChange={handleInputChange}
              placeholder="[A-Za-z0-9#$]"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {error.errors.password && (
            <p className="text-red-800 text-sm font-bold -mt-5 ml-1">
              {error?.errors?.password}
            </p>
          )}

          {/* name */}
          <div className="mb-5 mt-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
            {error?.errors?.name && (
              <p className="text-red-800 text-sm font-bold ml-1">
                {error?.errors?.name}
              </p>
            )}
          </div>
          {/* About */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              rows={5}
              type="text"
              id="about"
              name="about"
              value={user.about}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I am a developer"
              required
            />
            {error?.errors?.about && (
              <p className="text-red-800 text-sm font-bold ml-1">
                {error?.errors?.about}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center">
            <button
              type="submit"
              className="text-white border-gray-800 border-x-2 border-y-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-white border-gray-800 border-x-2 border-y-2 bg-red-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 mx-5 my-5 dark:hover:bg-rose-700 dark:focus:ring-blue-800"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
