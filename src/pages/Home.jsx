import React from "react";
import { Link } from "react-router-dom";
import PublicNav from "../components/PublicNav";

function Home() {
  return (
    <>
      <PublicNav />
      <div id="loginDiv" className="flex justify-center items-center h-screen px-4 sm:px-6 md:px-8">
        <div className="block w-full max-w-4xl p-6 shadow-md bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Start your hobby to write a blog
          </h5>
          <p className="text-sm sm:text-base font-normal text-gray-700 dark:text-gray-400 text-center">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
          <div className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 mt-6 dark:bg-gray-200">
            {/* <img
              className="w-full sm:w-48 h-48 object-cover rounded-t-lg sm:rounded-none sm:rounded-l-lg"
              src="https://media.licdn.com/dms/image/v2/D5635AQE93tvZMBGZPw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1727976555596?e=1735567200&v=beta&t=igzkscO2MOp2rwRb7I2RJq7oO4ckqzgixLrKVSZJOR8"
              alt="admin"
            /> */}
            <img src='https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png'
        height={300}
        width={300}
        loading='eager'
      />
            <div className="p-4 text-center sm:text-left">
              <h5 className="mb-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                Aayush Kumar Pathak
              </h5>
              <p className="mb-3 text-gray-700 font-medium">Admin and Developer</p>
              <Link
                to={"https://www.linkedin.com/in/aayush-kumar-pathak122165/"}
                target="_blank"
                className="inline-flex items-center justify-center p-2 text-gray-800 rounded-lg transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 h-6"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
                <span className="ml-2 text-sm font-medium">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
