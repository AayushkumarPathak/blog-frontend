import React, { useState, useRef, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";

import PostForm from "../components/PostForm";
import DashboardPublicPosts from "../components/DbPublicPosts";
import UserContext from "../contexts/UserContext";

function Dashboard() {
  const {setUser} = useContext(UserContext);

  useEffect(()=>{
    const currUser = JSON.parse(localStorage.getItem("loginToken"))?.user || {};
    setUser({currUser});
  },[])

  const {user} = useContext(UserContext);
  
  useEffect(()=>{
    console.log("Curr User using context: ",user);
    
  },[user])
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
