

import React, { useEffect, useState } from "react";
import PublicNav from "../components/PublicNav";
import { loadAllPosts } from "../services/postService";
import defaultBlog from "../assets/defaultBlog.png";
import { toast } from "react-toastify";

function BlogsFeed() {
  const [posts, setPosts] = useState([]);
  
  const [postConfig, setPostConfig] = useState({
    totalPages: 0,
    totalElements: 0, 
    pageSize: 0,
    lastPage: false,
    pageNumber:0,
  });
  
  useEffect(() => {
    loadAllPosts(0,postConfig.pageSize=5)
      .then((data) => {
        console.log("API Response:", data);
        setPosts(data.content || []);
        setPostConfig({
          totalPages: data.totalPages,
          totalElements: data.totalElements, 
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,

        });
      })
      .catch((err) => {
        console.log("Error in blog feed:", err);
      });
  }, []);

  const changePage = (pageNumber=0, pageSize=5) =>{
    loadAllPosts(pageNumber,pageSize).then((data)=>{
      setPosts(data.content || []);
    })
    .catch((err)=>{
      console.log("Error loading all posts pageNo.=",err);
      toast.error("Error loading page Size posts");
      
    })
  }
  
  useEffect(() => {
    console.log("Updated postConfig:", postConfig);
  }, [postConfig]); // Log when postConfig updates
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "No content available.";
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
  };
  

  

  const colors = [
    "bg-gradient-to-r from-pink-400 to-red-400",
    "bg-gradient-to-r from-purple-400 to-indigo-400",
    "bg-gradient-to-r from-blue-400 to-cyan-400",
    "bg-gradient-to-r from-green-400 to-lime-400",
    "bg-gradient-to-r from-yellow-400 to-orange-400",
    "bg-gradient-to-r from-gray-400 to-gray-600",
  ];

  return (
    // bg-gradient-to-b from-sky-400 to-yellow-300
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-emerald-50">
      <PublicNav />
      <div className="container mx-auto p-6">
        <h1 className="text-gray-900 text-4xl font-extrabold text-center mb-8 drop-shadow-md">
          Blogs Feed
        </h1>
        <div className="flex flex-col justify-center items-center gap-8">
          {posts.map((post, index) => (
                        <div
                          key={post.id || index}
                          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-purple-500 dark:hover:bg-gray-700 mb-6"
                        >
                          <img
                            className="object-cover w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={defaultBlog}
                            alt={post.title}
                          />
                          <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {post.title}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {truncateContent(post.content)}
                            </p>
                            <button className="text-blue-500 hover:underline">Read More</button>
                          </div>
                        </div>
                      ))}
        </div>

        <nav aria-label="Page navigation example">
          <ul class="flex items-center mt-10 justify-center -space-x-px h-8 text-sm">
           <li >
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                {postConfig.pageNumber > 0 && <svg
                  class="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>}
              </a>
            </li>
            {/* Page Numbers */}
              {[...Array(postConfig.totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                  onClick={()=>changePage(index)}
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}


            {/* next */}
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
       
      </div>
    </div>
  );
}

export default BlogsFeed;