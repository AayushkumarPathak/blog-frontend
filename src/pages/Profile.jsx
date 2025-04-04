
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserAllPosts } from "../services/postService";
function Profile() {
  const gradients = [
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-purple-500 to-indigo-500",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-lime-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-gray-500 to-gray-800",
  ];

  const [posts, setPosts] = useState([]);
  const user =  JSON.parse(localStorage.getItem("loginToken"))?.user || {}
  
  
  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    if (user?.id) {
      getUserAllPosts(user.id)
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => {
          console.log("Error getting user posts:", error);
        });
    }
    
  }, [user?.id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-emerald-50 py-8 px-4">      
           <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg shadow-gray-400 overflow-hidden mb-8 transition-transform duration-300 hover:shadow-xl">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Profile Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 15"
                      className="size-full rounded-full p-2 my-1"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1.5 0A1.5 1.5 0 0 0 0 1.5v12A1.5 1.5 0 0 0 1.5 15h12a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 13.5 0zm5 9A3.5 3.5 0 0 0 3 12.5v1a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1A3.5 3.5 0 0 0 8.5 9zM5 5.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-grow text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {toTitleCase(user?.name) || "User"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    {user?.email || "email@example.com"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                      {toTitleCase(user?.roles?.[0]?.name) || "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-2">
                    About
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {toTitleCase(user?.about) || "No information available"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-2">
                    Account
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-medium">Password:</span> ••••••••
                  </p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900  mb-6">
              Your Posts
            </h2>

            {posts.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  You haven't created any posts yet.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                  Create Your First Post
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <div
                  key={post.id || index}
                  className={`rounded-lg shadow-md overflow-hidden ${
                    gradients[index % gradients.length]
                  }`}
                >
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
                      {toTitleCase(post.title) || "Untitled Post"}
                    </h3>
                    <p className="text-white/90 mb-4 line-clamp-3 min-h-[4.5rem]"
                      dangerouslySetInnerHTML={{__html:post.content}}
                    >
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 py-2 bg-white/90 text-gray-800 rounded font-medium hover:bg-white transition duration-200 text-sm">
                        Read More
                      </button>
                      <button className="py-2 px-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded transition duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
