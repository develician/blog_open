import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import * as AuthAPI from 'lib/api/auth';
import { pender } from 'redux-pender';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const LOGIN = 'auth/LOGIN';
const CHECK = 'auth/CHECK';
const SET_LOGGED = 'auth/SET_LOGGED';
const LOGOUT = 'auth/LOGOUT';

export type Input = {
  username: string;
  password: string;
};

type ChangeInputPayload = { name: string; value: string };

export const authActions = {
  changeInput: createAction<ChangeInputPayload, ChangeInputPayload>(
    CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  login: createAction(LOGIN, AuthAPI.login),
  check: createAction(CHECK, AuthAPI.check),
  setLogged: createAction(SET_LOGGED),
  logout: createAction(LOGOUT, AuthAPI.logout),
};

type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type SetLoggedAction = ReturnType<typeof authActions.setLogged>;

export type AuthState = {
  input: Input;
  logged: boolean;
};

const initialState: AuthState = {
  input: {
    username: '',
    password: '',
  },
  logged: false,
};

const reducer = handleActions<AuthState, any>(
  {
    [CHANGE_INPUT]: (state: AuthState, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }
        const { name, value } = action.payload;
        draft.input[name] = value;
      });
    },
    [SET_LOGGED]: (state: AuthState, action: SetLoggedAction) => {
      return produce(state, draft => {
        draft.logged = true;
      });
    },
    ...pender({
      type: LOGIN,
      onSuccess: (state: AuthState) => {
        return produce(state, draft => {
          draft.logged = true;
        });
      },
    }),
  },
  initialState
);

export default reducer;
