import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as CategoryAPI from 'lib/api/category';

export type Category = {
  _id: string;
  category: string;
  subCategory: string[];
  ordering: number;
};

const SELECT_CATEGORY = 'category/SELECT_CATEGORY';
const CHANGE_CATEGORY_NAME = 'category/CHANGE_CATEGORY_NAME';
const ADD_CATEGORY = 'category/ADD_CATEGORY';
const CATEGORY_LIST = 'category/CATEGORY_LIST';
const REMOVE_CATEGORY = 'category/REMOVE_CATEGORY';
const REORDER_CATEGORY = 'category/REORDER_CATEGORY';
const REORDER_CATEGORY_TEMP = 'category/REORDER_CATEGORY_TEMP';

// export type MockType = {
// };

type ReorderCategoryPayload = { sourceId: string; destId: string };

export const categoryActions = {
  addCategory: createAction(ADD_CATEGORY, CategoryAPI.addCategory),
  changeCategoryname: createAction<string, string>(CHANGE_CATEGORY_NAME, category => category),
  selectCategory: createAction<string, string>(SELECT_CATEGORY, id => id),
  categoryList: createAction(CATEGORY_LIST, CategoryAPI.categoryList),
  removeCategory: createAction(REMOVE_CATEGORY, CategoryAPI.removeCategory),
  reorderCategory: createAction(REORDER_CATEGORY, CategoryAPI.reorderCategory),
  reorderCategoryTemp: createAction<
    { sourceId: string; destId: string },
    { sourceId: string; destId: string }
  >(REORDER_CATEGORY_TEMP, (payload: ReorderCategoryPayload) => {
    return {
      sourceId: payload.sourceId,
      destId: payload.destId,
    };
  }),
};

type SelectCategoryAction = ReturnType<typeof categoryActions.selectCategory>;
type ChangeCategorynameAction = ReturnType<typeof categoryActions.changeCategoryname>;
type CategoryListAction = {
  payload: {
    data: Category[];
  };
};
type AddCategoryAction = {
  payload: {
    data: Category;
  };
};
type ReorderCategoryAction = {
  payload: {
    data: Category[];
  };
};

type ReorderCategoryTempAction = ReturnType<typeof categoryActions.reorderCategoryTemp>;

export type CategoryState = {
  category: Category;
  selectedId: string;
  categories: Category[];
  categoryname: string;
};
const initialState: CategoryState = {
  category: {
    _id: '',
    category: '',
    subCategory: [],
    ordering: 0,
  },
  selectedId: '',
  categories: [],
  categoryname: '',
};

const reducer = handleActions<CategoryState, any>(
  {
    [SELECT_CATEGORY]: (state: CategoryState, action: SelectCategoryAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }
        draft.selectedId = action.payload;
      });
    },
    [CHANGE_CATEGORY_NAME]: (state: CategoryState, action: ChangeCategorynameAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) {
          return;
        }

        draft.categoryname = action.payload;
      });
    },
    [REORDER_CATEGORY_TEMP]: (state: CategoryState, action: ReorderCategoryTempAction) => {
      return produce(state, draft => {
        if (!action.payload) {
          return;
        }

        const sourceIndex = state.categories
          .map(category => category._id)
          .indexOf(action.payload.sourceId);
        const destIndex = state.categories
          .map(category => category._id)
          .indexOf(action.payload.destId);
        const source = draft.categories.splice(sourceIndex, 1);
        draft.categories.splice(destIndex, 0, source[0]);
      });
    },
    ...pender({
      type: ADD_CATEGORY,
      onSuccess: (state: CategoryState, action: AddCategoryAction) => {
        return produce(state, draft => {
          draft.categories.push(action.payload.data);
        });
      },
    }),
    ...pender({
      type: REORDER_CATEGORY,
      onSuccess: (state: CategoryState, action: ReorderCategoryAction) => {
        return produce(state, draft => {
          draft.categories = action.payload.data;
        });
      },
    }),
    ...pender({
      type: CATEGORY_LIST,
      onSuccess: (state: CategoryState, action: CategoryListAction) => {
        return produce(state, draft => {
          if (action.payload === undefined) {
            return;
          }
          draft.categories = action.payload.data;
          draft.selectedId = action.payload.data[0]._id;
        });
      },
    }),
  },
  initialState
);

export default reducer;
