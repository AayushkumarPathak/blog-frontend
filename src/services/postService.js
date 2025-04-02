import { myAxios, privateAxios } from "./APP_Constants";

/*
user/{uid}/category/{catId}/posts
*/
export const createPost = async (postData) => {
  // console.log("Post Service: ",po stData);

  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.category}/posts`,
      {
        title: postData.title,
        content: postData.content,
        category: { id: postData.category }, // Send category as an object
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginToken")).token
          }`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      throw error;
    });
};
/**
 *
 * @returns user posts.
 *  /posts/user/{uid}
 */
export const getUserAllPosts = async (uid) => {
  return privateAxios
    .get(`/posts/user/${uid}`)
    .then((response) => response.data);
};

export const loadAllPosts = async (pageNumber, pageSize) => {
  return myAxios
    .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error loading all posts: ", error);
    });
};
