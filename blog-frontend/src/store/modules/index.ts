import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import editor, { EditorState } from './editor';
import post, { PostState } from './post';
import list, { ListState } from './list';
import base, { BaseState } from './base';
import category, { CategoryState } from './category';
import { penderReducer as pender } from 'redux-pender';

export default combineReducers({
  auth,
  editor,
  post,
  list,
  base,
  category,
  pender,
});

export type State = {
  auth: AuthState;
  editor: EditorState;
  post: PostState;
  list: ListState;
  base: BaseState;
  category: CategoryState;
  pender: {
    pending: any;
    success: any;
    failure: any;
  };
};
