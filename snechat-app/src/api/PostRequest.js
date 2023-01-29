import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:3000"});

export const getTimeLinePosts = (id)=>API.get(`/post/${id}/timeline`);
export const getTimeLineComments = (id)=>API.get(`/post/${id}/comments/timeline`);
export const likePost = (dataId, userId)=>API.put(`/post/${dataId}/like`,{userId:userId});
export const deletePost = (postId, userId)=>API.delete(`/post/${postId}/delete/${userId}`);
export const deleteComment = (commentId, postId)=>API.delete(`/post/comment/${commentId}/delete/`);