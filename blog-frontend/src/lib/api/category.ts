import axios from 'axios';

type AddCategoryPayload = { category: string };
type ReorderCategoryPayload = { sourceId: string; destId: string };

export const categoryList = () => axios.get(`/api/category`);
export const addCategory = (payload: AddCategoryPayload) => axios.post(`/api/category`, payload);
export const removeCategory = id => axios.delete(`/api/category/${id}`);
export const reorderCategory = (payload: ReorderCategoryPayload) =>
  axios.post(`/api/category/reorder`, payload);
