import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { loadPostById } from "../services/postService";
import { toTitleCase } from "../services/helper";
import postPageDefImage from "../assets/postPageDefImage.jpg"
import CommentSection from "../components/CommentSection";
function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    loadPostById(postId)
      .then((data) => {
      //   console.log("Individual post ", data);
        setPost(data);
      })
      .catch((err) => {
        console.log("Error loading post with provided id at Postpage", err);
      });
  }, []);
  const parseDate = (myDate) => {
    return new Date(myDate).toLocaleDateString();
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-10 px-4">
        <h2 className="text-black text-xl">This is Post Page</h2>

        {/* Full Post Card */}
        <div className="w-full max-w-6xl p-2 mb-8 bg-white shadow-md shadow-gray-400 border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-black font-semibold">
                  <span className="text-gray-500">Posted By {" "}</span>
                  <span className="text-xl">{toTitleCase(post?.user?.name)}</span>
            </h3>
            <span className="text-gray-600 text-sm">
              {"At "+parseDate(post?.dateCreated)}
            </span>
            <h6 className="mt-2 text-slate-800 text-xl font-semibold">
              {post?.title}
            </h6>
            <p
              className="mt-2 text-slate-600 leading-relaxed font-light text-justify"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></p>
          </div>
          <div className="relative flex justify-center items-center h-64 sm:h-80 w-full bg-gray-100">
            <img
              className="h-full w-auto max-w-full object-cover rounded-b-lg"
              src={postPageDefImage}
              alt="card-image"
            />
          </div>
        </div>
        {/* Post card end */}
        {/* Add comment start */}
        <div>
          <CommentSection postId = {postId}/>
        </div>
        {/* Add comment end */}
      </div>
    </div>
  );
}

export default PostPage;
