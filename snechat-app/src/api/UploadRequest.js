import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:3000"});

export const uploadImage = (data)=>API.post('/upload/',data);
export const uploadPost = (data)=>API.post('/post/create',data);
export const uploadComment = (data)=>API.post('/post/comment/add',data);