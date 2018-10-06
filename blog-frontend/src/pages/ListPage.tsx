import * as React from 'react';
import PageTemplate from 'components/common/PageTemplate';
// import ListWrapper from 'components/list/ListWrapper';
import ListContainer from 'containers/list/ListContainer';
import { bindActionCreators } from 'redux';
import { listActions } from 'store/modules/list';

// interface ListPageProps {
//   match: any;
// }

const ListPage: React.SFC<{}> = () => {
  return (
    <PageTemplate sideBarVisible={true}>
      {/* <ListWrapper> */}
      <ListContainer />
      {/* </ListWrapper> */}
    </PageTemplate>
  );
};

(ListPage as any).preload = (dispatch, params) => {
  const ListActions = bindActionCreators(listActions, dispatch);
  const { page = 1, tag, category } = params;

  return ListActions.getPostList({ tag, page, category });
};

export default ListPage;
