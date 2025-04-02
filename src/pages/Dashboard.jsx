import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";

import PostForm from "../components/PostForm";
import DashboardPublicPosts from "../components/DbPublicPosts";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div
        id="loginDi"
        className="flex bg-gradient-to-r from-green-200 to-emerald-50 justify-center flex-col px-10 items-center  min-h-screen "
      >
        <PostForm />
        <DashboardPublicPosts/>
      </div>
    </>
  );
}

export default Dashboard;
