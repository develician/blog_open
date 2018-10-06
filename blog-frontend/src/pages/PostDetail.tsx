import * as React from 'react';
import PageTemplate from 'components/common/PageTemplate/PageTemplate';
import PostDetailContainer from 'containers/post/PostDetailContainer';
import AskRemoveModalContainer from 'containers/modal/AskRemoveModalContainer';
import { postActions } from 'store/modules/post';
import { bindActionCreators } from 'redux';

// interface PostDetailProps {
//   match: any;
// }

const PostDetail: React.SFC<{}> = () => {
  return (
    <PageTemplate sideBarVisible={false}>
      <PostDetailContainer />
      <AskRemoveModalContainer />
    </PageTemplate>
  );
};

(PostDetail as any).preload = (dispatch, params) => {
  const { id } = params;
  const PostActions = bindActionCreators(postActions, dispatch);
  return PostActions.getPostDetail({ id });
};

export default PostDetail;
