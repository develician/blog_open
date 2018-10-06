import * as React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { postActions, Post } from 'store/modules/post';
import { State } from 'store/modules';
import { withRouter } from 'react-router-dom';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import { Helmet } from 'react-helmet';
import removeMd from 'remove-markdown';
import DisqusThread from 'components/post/DisqusThread/DisqusThread';
// import Progress from 'react-progress';
import $ from 'jquery';
import PageHeaderContainer from '../common/PageHeaderContainer';

export interface PostDetailContainerProps {
  post: Post;
  PostActions: typeof postActions;
  match: any;
  loading: boolean;
  id: string;
  history: any;
}

// if (!process.env.BROWSER) {
//   (global as any).window = {};
// }

// const $ = (window as any).$;

class PostDetailContainer extends React.Component<PostDetailContainerProps> {
  public state = {
    loading: true,
    percent: 0,
  };

  public componentDidMount() {
    this.getPostDetail();
    $(window).scroll(() => {
      if (($(window).scrollTop() / ($(document).height() - $(window).height())) * 100 === 100) {
        this.setState({
          percent: 99.999999,
        });
        return;
      }
      this.setState({
        percent: ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100,
      });
    });
  }

  public componentWillUnmount() {
    $(window).unbind();
  }

  public getPostDetail = async () => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPostDetail({ id: this.props.match.params.id });
      this.setState({
        loading: false,
      });
    } catch (e) {
      console.log(e);
      this.props.history.goBack();
    }
  };

  public handleNewComment(comment) {
    console.log(comment.text);
  }

  public render() {
    const { post, loading } = this.props;
    if (loading) {
      return null;
    }
    return (
      <div>
        <PageHeaderContainer />
        {/* <Progress percent={this.state.percent} style={{ zIndex: 30 }} /> */}
        <PostInfo
          title={post.title}
          tags={post.tags}
          thumbnail={post.thumbnail}
          publishedDate={post.publishedDate}
        />
        <PostBody markdown={post.body} />
        {!loading && (
          <Helmet>
            <title>{post.title}</title>
            <meta name="description" content={removeMd(post.body).slice(0, 200)} />
          </Helmet>
        )}
        <DisqusThread id={post._id} title={post.title} path={`/post/${post._id}`} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ post, pender }: State) => ({
      post: post.post,
      loading: pender.pending['post/GET_POST_DETAIL'],
    }),
    dispatch => ({
      PostActions: bindActionCreators(postActions, dispatch),
    })
  )
)(PostDetailContainer);

(PostDetailContainer as any).preload = (dispatch, match) => {
  const { id } = match.params;
  const PostActions = bindActionCreators(postActions, dispatch);
  return PostActions.getPostDetail({ id });
};
