import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-pro-react";
import { loadAllCategories } from "../services/categoryService";
import { createPost as doCreatePost } from "../services/postService";
import { getCurrentUser } from "../auth";
import { toast } from "react-toastify";

function PostForm() {
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [categories, setCategories] = useState([]);
  const [currUser,setCurrUser] = useState({});

  useEffect(() => {

    loadAllCategories().then((data) => {
      
      setCategories(data);
      setCurrUser(getCurrentUser());


      console.log("Categories:", data);
    }).catch(error => {
      console.log("Error loading categories: ",error);
      
    });

  }, []);

  

  const toTitleCase = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  // Handler for input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Debounce-like approach for JoditEditor
  const handleContentChange = (newContent) => {
    formData.content = newContent; // Update directly without triggering re-render
  };

  const handleReset = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
    });
    if (editor.current) {
      editor.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.title === ""  ){
      toast.error("Title is required");
      return;
    }
    else if(formData.category === ""){
      toast.error("Category is required");
      return;
    }
    else if(formData.content === ""){
      toast.error("Content is required");
      return;
    }
    
    console.log("Form Data:", formData);
    formData['userId'] = currUser?.id;

    
    doCreatePost(formData)
    .then((data) => {
      console.log("Post Created");
      toast.success("Post Created")
    })
    .catch((err) => {
      toast.error("Unable to create post! Try again later");
      console.log("Error doCreatePost:", err);
    });
    //reset form after submit
   
    setShowForm(true)
    // Backend submission logic here
  };

  const userName = currUser?.name;
  // const userName = "Guest";
  return (
    <>
      <div className="bg-gray-800 shadow-lg  shadow-gray-500 border-y-4 border-yellow-300 text-white w-full max-w-screen-2xl mx-10 my-10 p-4 rounded-xl ">
        <h1 className="text-2xl font-bold mb-4">
          <span className="font-light text-yellow-400 italic">
            {" "}
            Hi {userName ? toTitleCase(userName) : "Guest"},{" "}
          </span>
          Do you want to post a Blog? 🖐️
        </h1>
        <div className="prose prose-invert max-w-full mb-4"></div>
        <button
          className="bg-blue-500 hover:bg-yellow-400 text-white font-bold py-2 px-2 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add New Post"}
        </button>

        {showForm && (
          <form className="mt-6" onSubmit={handleSubmit} noValidate>
            <div className="bg-gray-700 p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-100 mb-4">
                Add New Post
              </h2>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="title">
                  Post Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-800 text-gray-300"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-300 mb-2"
                  htmlFor="content"
                >
                  Post Content
                </label>
                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  onChange={handleContentChange}
                  config={{
                    readonly: false,
                    style: {
                      background: "#1a202c",
                      color: "#e2e8f0",
                    },
                    height: 300,
                  }}
                />
              </div>
              {/* Category field */}
              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Select a Category
                </label>
                <select
                  id="categories"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  defaultValue={1}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block p-2.5 sm:text-sm md:text-base lg:text-lg"
                >
                  <option disabled value="">
                    --Select a category--
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category?.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons Submit, Reset */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Post Now
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default PostForm;
