import { BrowserRouter, Route, Router, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import UserPages from "./pages/UserPages";
import PageNotFound from "./pages/PageNotFound";
import BlogsFeed from "./pages/BlogsFeed";
import UserContextProvider from "./contexts/UserContextProvider";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop={false}
          className="h-10 w-10"
          closeOnClick
        />
        <UserContextProvider>
          <Routes>
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogfeed" element={<BlogsFeed />} />
            <Route path="/post/:postId" element={<PostPage/>}/>

            <Route path="/user" element={<UserPages />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
