import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as PostAPI from 'lib/api/post';
import { pender } from 'redux-pender';

const GET_POST_DETAIL = 'post/GET_POST_DETAIL';
const REMOVE_POST = 'post/REMOVE_POST';

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

export const postActions = {
  getPostDetail: createAction(GET_POST_DETAIL, PostAPI.getPostDetail),
  removePost: createAction(REMOVE_POST, PostAPI.removePost),
};

type GetPostDetail = {
  type: string;
  payload: {
    data: Post;
  };
};

export type PostState = {
  post: Post;
};

const initialState: PostState = {
  post: {
    _id: '',
    title: '',
    body: '',
    tags: [],
    isTemporary: false,
    thumbnail: '',
    publishedDate: new Date(),
    category: '',
  },
};

const reducer = handleActions<PostState, any>(
  {
    ...pender({
      type: GET_POST_DETAIL,
      onSuccess: (state: PostState, action: GetPostDetail) => {
        return produce(state, draft => {
          if (action.payload === undefined) {
            return;
          }
          draft.post = action.payload.data;
        });
      },
    }),
  },
  initialState
);

export default reducer;
