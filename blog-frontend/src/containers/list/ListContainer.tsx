import * as React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { listActions, Post } from 'store/modules/list';
import { authActions } from 'store/modules/auth';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';
import { Helmet } from 'react-helmet';

export interface ListContainerProps {
  postList: Post[];
  lastPage: number;
  loading: boolean;
  ListActions: typeof listActions;
  AuthActions: typeof authActions;
  match: any;
  location: any;
  history: any;
  logged: boolean;
}

class ListContainer extends React.Component<ListContainerProps> {
  public componentDidMount() {
    this.checkAdmin();
    this.getPostList();
  }

  public checkAdmin = async () => {
    const { AuthActions } = this.props;
    const isTemporary = this.props.location.pathname.split('/')[1] === 'temporary';
    try {
      await AuthActions.check();
    } catch (e) {
      if (isTemporary) {
        this.props.history.push('/');
      }
    }
  };

  public componentDidUpdate(prevProps: ListContainerProps) {
    if (
      prevProps.match.params.page !== this.props.match.params.page ||
      prevProps.match.params.tag !== this.props.match.params.tag
    ) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getPostList();
      document.documentElement.scrollTop = 0;
    }
  }

  public getPostList = async () => {
    const { ListActions } = this.props;
    const { page = 1, tag, category } = this.props.match.params;
    const isTemporary = this.props.location.pathname.split('/')[1] === 'temporary';

    try {
      if (isTemporary) {
        await ListActions.getTemporaryList({ page });
        return;
      }
      await ListActions.getPostList({ tag, page, category });

      if (parseInt(page, 10) < 1 || parseInt(page, 10) > this.props.lastPage) {
        this.props.history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    const { postList, loading, lastPage } = this.props;
    const { page = 1, tag, category } = this.props.match.params;
    if (loading) {
      return null;
    }

    const title = (() => {
      let titleString = "killi8n's blog";
      if (tag) {
        titleString += ` #${tag}`;
      }
      if (category) {
        titleString += ` - ${category}`;
      }
      if (page !== 1) {
        titleString += ` - ${page}`;
      }
      return titleString;
    })();

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <PostList posts={postList} />
        <Pagination page={parseInt(page, 10)} tag={tag} lastPage={lastPage} category={category} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ list, pender, auth }: State) => ({
      postList: list.list,
      lastPage: list.lastPage,
      loading: pender.pending['list/GET_POST_LIST'],
      logged: auth.logged,
    }),
    dispatch => ({
      ListActions: bindActionCreators(listActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch),
    })
  )
)(ListContainer);
