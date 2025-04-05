import React from "react";
import defaultBlog from "../assets/defaultBlog.png";
import { Link } from "react-router-dom";
function PostCard({ post, index }) {
  const truncateContent = (content, maxLength = 100) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };
  return (
    <div
      key={post.postId || index}
      className="flex flex-col items-center bg-white border border-gray-300 shadow-lg shadow-gray-400 rounded-lg  md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-6"
    >
      <img
        className="object-cover w-full rounded-t-lg h-full md:h-44 md:w-48 md:rounded-none md:rounded-s-lg"
        src={defaultBlog}
        alt={post.title}
      />
      <div className="flex flex-col  justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {truncateContent(post.title)}
        </h5>
        <p
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 99) + "...",
          }}
          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
        ></p>
        <Link
          to={"/post/" + post.postId}
          className="text-gray-800  h-10 w-28 p-2 rounded-sm bg-yellow-400 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
