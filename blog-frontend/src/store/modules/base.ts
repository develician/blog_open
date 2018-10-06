import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

export type VisibleType = {
  remove: boolean;
  menuBar: boolean;
  category: boolean;
  addCategory: boolean;
};

export const baseActions = {
  showModal: createAction<string, string>(SHOW_MODAL, modal => modal),
  hideModal: createAction<string, string>(HIDE_MODAL, modal => modal),
};

type ShowModalAction = ReturnType<typeof baseActions.showModal>;
type HideModalAction = ReturnType<typeof baseActions.hideModal>;

export type BaseState = {
  visible: VisibleType;
};

const initialState: BaseState = {
  visible: {
    remove: false,
    menuBar: false,
    category: false,
    addCategory: false,
  },
};

const reducer = handleActions<BaseState, any>(
  {
    [SHOW_MODAL]: (state: BaseState, action: ShowModalAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }
        draft.visible[action.payload] = true;
      });
    },
    [HIDE_MODAL]: (state: BaseState, action: HideModalAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }
        draft.visible[action.payload] = false;
      });
    },
  },
  initialState
);

export default reducer;
