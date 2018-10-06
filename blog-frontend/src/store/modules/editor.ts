import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as EditorAPI from 'lib/api/editor';
import * as FilesAPI from 'lib/api/files';
import { Post } from './post';
import { pender } from 'redux-pender';

const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';
const GET_POST = 'editor/GET_POST';
const EDIT_POST = 'editor/EDIT_POST';
const UPLOAD_IMAGE = 'editor/UPLOAD_IMAGE';
const UPLOAD_MARKDOWN_IMAGE = 'editor/UPLOAD_MARKDOWN_IMAGE';

type ChangeInputPayload = { name: string; value: string };

export const editorActions = {
  changeInput: createAction<ChangeInputPayload, ChangeInputPayload>(
    CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  initialize: createAction(INITIALIZE),
  writePost: createAction(WRITE_POST, EditorAPI.writePost),
  getPost: createAction(GET_POST, EditorAPI.getPost),
  editPost: createAction(EDIT_POST, EditorAPI.editPost),
  uploadImage: createAction(UPLOAD_IMAGE, FilesAPI.s3ImageUpload),
  uploadMarkdownImage: createAction(UPLOAD_MARKDOWN_IMAGE, FilesAPI.s3MarkdownImageUpload),
};

type GetPost = {
  type: string;
  payload: {
    data: Post;
  };
};

type ChangeInputAction = ReturnType<typeof editorActions.changeInput>;
type UploadImageAction = {
  payload: {
    data: {
      storedImagename: string;
    };
  };
};
type UploadMarkdownImageAction = {
  payload: {
    data: {
      storedImagename: string;
    };
  };
};

export type EditorState = {
  title: string;
  markdown: string;
  tags: string;
  postId: string;
  changed: boolean;
  thumbnail: string;
  markdownImage: string;
};

const initialState: EditorState = {
  title: '',
  markdown: '',
  tags: '',
  postId: '',
  changed: false,
  thumbnail: '',
  markdownImage: '',
};

const reducer = handleActions<EditorState, any>(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_INPUT]: (state: EditorState, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }
        const { name, value } = action.payload;
        if (value !== '') {
          draft.changed = true;
        }
        draft[name] = value;
      });
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state: EditorState, action: any) => {
        const { data: post } = action.payload;
        return produce(state, draft => {
          draft.changed = false;
          draft.postId = post._id;
        });
      },
    }),
    ...pender({
      type: EDIT_POST,
      onSuccess: (state: EditorState, action: any) => {
        return produce(state, draft => {
          draft.changed = false;
        });
      },
    }),
    ...pender({
      type: GET_POST,
      onSuccess: (state: EditorState, action: GetPost) => {
        const { data: post } = action.payload;
        return produce(state, draft => {
          draft.title = post.title;
          draft.markdown = post.body;
          draft.thumbnail = post.thumbnail;

          draft.tags = post.tags.join(', ');
        });
      },
    }),
    ...pender({
      type: UPLOAD_IMAGE,
      onSuccess: (state: EditorState, action: UploadImageAction) => {
        const { storedImagename } = action.payload.data;
        return produce(state, draft => {
          draft.thumbnail = storedImagename;
        });
      },
    }),
    ...pender({
      type: UPLOAD_MARKDOWN_IMAGE,
      onSuccess: (state: EditorState, action: UploadMarkdownImageAction) => {
        const { storedImagename } = action.payload.data;
        return produce(state, draft => {
          draft.markdownImage = storedImagename;
          // draft.markdown = `${
          //   state.markdown
          // }![](https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/${storedImagename})`;
        });
      },
    }),
  },
  initialState
);

export default reducer;
