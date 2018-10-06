import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as ListAPI from 'lib/api/list';
import { pender } from 'redux-pender';

const GET_POST_LIST = 'list/GET_POST_LIST';
const GET_TEMPORARY_LIST = 'list/GET_TEMPORARY_LIST';

export type Post = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  isTemporary: boolean;
  publishedDate: Date;
  thumbnail: string;
  category: string;
};

export const listActions = {
  getPostList: createAction(GET_POST_LIST, ListAPI.getPostList),
  getTemporaryList: createAction(GET_TEMPORARY_LIST, ListAPI.getTemporaryList),
};

type GetPostList = {
  payload: {
    data: Post[];
    headers: any;
  };
};

type GetTemporaryList = {
  payload: {
    data: Post[];
    headers: any;
  };
};

export type ListState = {
  list: Post[];
  lastPage: number;
};

const initialState: ListState = {
  list: [],
  lastPage: 0,
};

const reducer = handleActions<ListState, any>(
  {
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state: ListState, action: GetPostList) => {
        return produce(state, draft => {
          if (action.payload === undefined) {
            return;
          }
          const lastPage = action.payload.headers['last-page'];
          draft.list = action.payload.data;
          draft.lastPage = parseInt(lastPage, 10);
        });
      },
    }),
    ...pender({
      type: GET_TEMPORARY_LIST,
      onSuccess: (state: ListState, action: GetTemporaryList) => {
        return produce(state, draft => {
          if (action.payload === undefined) {
            return;
          }
          const lastPage = action.payload.headers['last-page'];
          draft.list = action.payload.data;
          draft.lastPage = parseInt(lastPage, 10);
        });
      },
    }),
  },
  initialState
);

export default reducer;
