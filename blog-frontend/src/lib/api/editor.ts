import axios from 'axios';

type writePostPayload = {
  title: string;
  body: string;
  tags: string[];
  thumbnail: string;
  categoryId: string;
  isTemporary: boolean;
};
export const writePost = (payload: writePostPayload) => axios.post(`/api/post`, payload);

type getPostPayload = { id: string };
export const getPost = (payload: getPostPayload) => axios.get(`/api/post/${payload.id}`);

type editPostPayload = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  thumbnail: string;
  categoryId: string;
  isTemporary: boolean;
};
export const editPost = ({ id, ...payload }: editPostPayload) =>
  axios.patch(`/api/post/${id}`, payload);
