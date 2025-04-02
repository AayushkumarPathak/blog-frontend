

import React, { useEffect, useState } from "react";
import PublicNav from "../components/PublicNav";
import { loadAllPosts } from "../services/postService";
import defaultBlog from "../assets/defaultBlog.png";
import { toast } from "react-toastify";
import DashboardPublicPosts from "../components/DbPublicPosts";

function BlogsFeed() {
  

  return (
    // bg-gradient-to-b from-sky-400 to-yellow-300
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-emerald-50">
      <PublicNav />
      <div className="container mx-auto flex flex-col justify-center items-center p-6">
       <DashboardPublicPosts title={"Blogs Feed"}/>
      </div>
    </div>
  );
}

export default BlogsFeed;