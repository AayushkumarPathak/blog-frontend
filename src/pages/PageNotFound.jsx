import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const PageNotFound = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loginToken"))?.user

  

  const navigatePage = () =>{
    if(!user){
      navigate("/")
    }
    else{
      navigate("/user/dashboard");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-200 animate-bounce-slow">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <p className="text-2xl md:text-4xl font-semibold text-gray-700 animate-slideUp">
              Page Not Found
            </p>
          </div>
        </div>

        {/* Animated Spaceship */}
        <div className="relative my-16">
          {/* Spaceship Body */}
          <div className="w-24 h-24 mx-auto relative animate-hover">
            {/* Top part (UFO dome) */}
            <div className="absolute w-20 h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-full left-1/2 -translate-x-1/2">
              <div className="absolute w-4 h-4 rounded-full bg-blue-400 left-4 top-2 animate-pulse"></div>
              <div className="absolute w-4 h-4 rounded-full bg-green-400 right-4 top-2 animate-pulse delay-150"></div>
            </div>
            {/* Bottom part (UFO base) */}
            <div className="absolute w-24 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full top-8 left-1/2 -translate-x-1/2">
              <div className="absolute w-full h-full animate-pulse-ring"></div>
            </div>
          </div>

          {/* Animated Stars */}
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-150"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-300"></div>
        </div>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! Looks like you've ventured into unknown territory. 
          The page you're looking for has gone on an adventure without us.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transform transition-all duration-300 hover:scale-105"
          >
            {/* Back Arrow Icon */}
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          
          <button 
            onClick={() => navigatePage()}
            className="group flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          >
            {/* Home Icon */}
            <svg 
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(147, 197, 253, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(147, 197, 253, 0); }
          100% { box-shadow: 0 0 0 0 rgba(147, 197, 253, 0); }
        }
        .animate-hover {
          animation: hover 3s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;