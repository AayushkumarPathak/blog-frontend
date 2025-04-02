// import React, { useEffect, useState } from 'react'
// import PublicNav from '../components/PublicNav'
// import {loadAllPosts} from "../services/postService";
// function BlogsFeed() {

//     const [posts,setPosts] = useState({});

//     useEffect(()=>{
//         loadAllPosts().then((data)=>{
//             console.log(data);
//             setPosts(data);
//         }).catch((err)=>{
//             console.log("Error blogfeed",err);
//         })
//     },[])
//   return (
//     <div className=''>
//       <PublicNav/>
//       <div className='text-gray-900 text-2xl'>
//         This is blogs feed
//       </div>

//     </div>
//   )
// }

// export default BlogsFeed
// import React, { useEffect, useState } from 'react';
// import PublicNav from '../components/PublicNav';
// import { loadAllPosts } from '../services/postService';
// import defaultBlog from "../assets/defaultBlog.png"
// function BlogsFeed() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     loadAllPosts()
//       .then((data) => {
//         console.log(data);
//         setPosts(data.content || []);
//       })
//       .catch((err) => {
//         console.log('Error blogfeed', err);
//       });
//   }, []);

//   return (
//     <div className='min-h-screen bg-gray-100'>
//       <PublicNav />
//       <div className='container mx-auto p-4'>
//         <h1 className='text-gray-900 text-3xl font-bold text-center mb-6'>Blogs Feed</h1>
//         <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {posts.length > 0 ? (
//             posts.map((post, index) => (
//               <div key={post.id || index} className='bg-white rounded-lg shadow-lg overflow-hidden'>
//                 <img
//                   src={defaultBlog} // Default image
//                   alt='Post Cover'
//                   className='w-full h-48 object-cover'
//                 />
//                 <div className='p-4'>
//                   <h2 className='text-xl font-semibold text-gray-800 mb-2'>
//                     {post.title || 'Untitled Post'}
//                   </h2>
//                   <p className='text-gray-600 text-sm line-clamp-3'>
//                     {post.content || 'No content available.'}
//                   </p>
//                   <button className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'>
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className='text-center text-gray-600 col-span-full'>No posts available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogsFeed;
import React, { useEffect, useState } from 'react';
import PublicNav from '../components/PublicNav';
import { loadAllPosts } from '../services/postService';
import defaultBlog from "../assets/defaultBlog.png";

function BlogsFeed() {
  const [posts, setPosts] = useState([]);
  const colors = [
    "bg-gradient-to-r from-pink-400 to-red-400",
    "bg-gradient-to-r from-purple-400 to-indigo-400",
    "bg-gradient-to-r from-blue-400 to-cyan-400",
    "bg-gradient-to-r from-green-400 to-lime-400",
    "bg-gradient-to-r from-yellow-400 to-orange-400",
    "bg-gradient-to-r from-gray-400 to-gray-600"
  ];

  useEffect(() => {
    loadAllPosts()
      .then((data) => {
        console.log(data);
        setPosts(data.content || []);
      })
      .catch((err) => {
        console.log('Error blogfeed', err);
      });
  }, []);

  return (
    // bg-gradient-to-b from-sky-400 to-yellow-300
    <div className='min-h-screen bg-gradient-to-r from-green-200 to-emerald-50'>
      <PublicNav />
      <div className='container mx-auto p-6'>
        <h1 className='text-gray-900 text-4xl font-extrabold text-center mb-8 drop-shadow-md'>Blogs Feed</h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div 
                key={post.id || index} 
                className={`rounded-2xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-3xl ${colors[index % 6]}`}>
                <img
                  src={defaultBlog} // Default image
                  alt='Post Cover'
                  className='w-full h-56 object-cover rounded-t-2xl'
                />
                <div className='p-6'>
                  <h2 className='text-2xl font-bold text-white mb-3'>
                    {post.title || 'Untitled Post'}
                  </h2>
                  <p className='text-white text-base line-clamp-3'>
                    {post.content || 'No content available.'}
                  </p>
                  <button className='mt-5 w-full bg-white text-gray-900 py-3 px-5 rounded-xl font-semibold hover:bg-gray-300 transition duration-300'>
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-700 text-lg col-span-full'>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogsFeed;