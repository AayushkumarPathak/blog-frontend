

import React, { useEffect, useState } from 'react';
import defaultBlog from "../assets/defaultBlog.png";
import { loadAllPosts } from '../services/postService';

function DashboardPublicPosts({title}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      loadAllPosts(0,5)
        .then((data) => {
          const postsData = Array.isArray(data) ? data : (data?.content || []);
          setPosts(postsData);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error loading all posts", err);
          setError("Failed to load posts. Please try again later.");
          setLoading(false);
        });
    }, []);

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
        </div>
    </div>
  );
}

export default DashboardPublicPosts;