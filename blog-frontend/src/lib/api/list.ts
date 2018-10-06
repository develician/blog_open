import axios from 'axios';
import * as queryString from 'query-string';

type getPostListPayload = { tag: string; page: number; category: string };
export const getPostList = (payload: getPostListPayload) =>
  axios.get(
    `/api/post?${queryString.stringify({
      tag: payload.tag,
      page: payload.page,
      category: payload.category,
    })}`
  );

type getTemporaryListPayload = { page: number };
export const getTemporaryList = (payload: getTemporaryListPayload) =>
  axios.get(`/api/post/list/temporary?${queryString.stringify({ page: payload.page })}`);
