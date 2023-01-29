import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:3000"});

export const getUser = (userId)=>API.get(`/user/${userId}`);
export const updateUser = (userId,data)=>API.put(`/user/update/${userId}`,data);
export const getAllUsers = ()=>API.get('/user/all');
export const followUser = (id,userData)=>API.put(`/user/${id}/follow`,userData);
export const unFollowUser = (id,userData)=>API.put(`/user/${id}/unfollow`,userData);
