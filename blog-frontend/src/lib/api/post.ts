import axios from 'axios';

type getPostDetailPayload = { id: string };
export const getPostDetail = (payload: getPostDetailPayload) =>
  axios.get(`/api/post/${payload.id}`);

type removePostPayload = { id: string };
export const removePost = (payload: removePostPayload) => axios.delete(`/api/post/${payload.id}`);
