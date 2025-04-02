

import React, { useEffect, useState } from 'react';
import defaultBlog from "../assets/defaultBlog.png";
import { loadAllPosts } from '../services/postService';

function DashboardPublicPosts({title}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postConfig, setPostConfig] = useState({
        totalPages: 0,
        totalElements: 0, 
        pageSize: 0,
        lastPage: false,
        pageNumber:0,
      });

    // useEffect(() => {
    //   setLoading(true);
    //   loadAllPosts(0,5)
    //     .then((data) => {
    //       const postsData = Array.isArray(data) ? data : (data?.content || []);
    //       setPosts(postsData);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("Error loading all posts", err);
    //       setError("Failed to load posts. Please try again later.");
    //       setLoading(false);
    //     });
    // }, []);

    useEffect(() => {
      setLoading(true);
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
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error in blog feed:", err);
            setError("Failed to load posts. Please try again later.");
            setLoading(false);
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
    const truncateContent = (content, maxLength = 100) => {
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
    };

  return (
    <div>
      <div className="w-full max-w-4xl">
          <h3 className="text-xl font-bold text-gray-900 bg-yellow-300 p-2 rounded-md mb-4">
           {title ? title : "Latest Posts 😊"} 
          </h3>

          {loading && (
            <div className="text-center py-10">
              <p>Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-10 border border-gray-200 rounded-lg mb-6">
              <p className="text-gray-600 font-medium">No posts available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back later for updates!</p>
            </div>
          )}

          {!loading && posts && posts.length > 0 && 
            posts.map((post, index) => (
              <div
                key={post.id || index}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6"
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
            ))
          }
          <div>
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
    </div>
  );
}

export default DashboardPublicPosts;