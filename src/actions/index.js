import axios from "axios";
export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create_post";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";

const ROOT_URL="http://reduxblog.herokuapp.com/api";
const API_KEY="?key=nikhilp847"

//payload is request from the AJAX request(asynchronous) and it returns a promise. This is resolved by our middleware and then sent to our reducers.
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}
//We receive the values object as well as the callback which tells the action creator what to do after the promise(post req via axios) is resolved.
//Here after promise is resolved, we call the callback function and navigate to landing page(postIndex).
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts/${API_KEY}`, values)
  .then(() => {
    callback();});
  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
