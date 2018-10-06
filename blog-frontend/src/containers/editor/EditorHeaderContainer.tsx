import * as React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withRouter, Prompt } from 'react-router-dom';
import { editorActions } from 'store/modules/editor';
import { authActions } from 'store/modules/auth';
import { State } from 'store/modules';
import EditorHeader from 'components/editor/EditorHeader';
import * as queryString from 'query-string';

export interface EditorHeaderContainerProps {
  history: any;
  EditorActions: typeof editorActions;
  AuthActions: typeof authActions;
  title: string;
  markdown: string;
  tags: string;
  postId: string;
  location: any;
  pending: boolean;
  logged: boolean;
  changed: boolean;
  thumbnail: string;
  selectedId: string;
}

class EditorHeaderContainer extends React.Component<EditorHeaderContainerProps> {
  public componentDidMount() {
    const { EditorActions, location } = this.props;

    EditorActions.initialize();

    const { id } = queryString.parse(location.search);
    if (id) {
      this.getPost();
    }
  }

  public handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  public getPost = async () => {
    const { EditorActions, location } = this.props;

    try {
      await EditorActions.getPost({ id: queryString.parse(location.search).id });
    } catch (e) {
      console.log(e);
    }
  };

  public handleSubmitTemporary = async () => {
    const { EditorActions, title, markdown, tags, history, thumbnail, selectedId } = this.props;

    const post = {
      title,
      thumbnail,
      body: markdown,
      tags: tags === '' ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))],
      categoryId: selectedId,
      isTemporary: true,
    };

    try {
      const { id } = queryString.parse(location.search);
      if (id) {
        await EditorActions.editPost({ id, ...post });
        history.push(`/post/${id}`);
        return;
      }
      await EditorActions.writePost(post);
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  public handleSubmit = async () => {
    const { EditorActions, title, markdown, tags, history, thumbnail, selectedId } = this.props;

    const post = {
      title,
      thumbnail,
      body: markdown,
      tags: tags === '' ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))],
      categoryId: selectedId,
      isTemporary: false,
    };

    try {
      const { id } = queryString.parse(location.search);
      if (id) {
        await EditorActions.editPost({ id, isTemporary: false, ...post });
        history.push(`/post/${id}`);
        return;
      }
      await EditorActions.writePost(post);
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  public message = () => '작성중이던 포스트가 있습니다. 정말로 나가시겠습니까?';

  public render() {
    const { id } = queryString.parse(this.props.location.search);
    if (!this.props.logged || this.props.pending) {
      return null;
    }
    return (
      <React.Fragment>
        <EditorHeader
          isEdit={id ? true : false}
          onSubmit={this.handleSubmit}
          onGoBack={this.handleGoBack}
          onSubmitTemporary={this.handleSubmitTemporary}
        />
        <Prompt when={this.props.changed} message={this.message} />
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ editor, auth, pender, category }: State) => ({
      title: editor.title,
      markdown: editor.markdown,
      tags: editor.tags,
      postId: editor.postId,
      pending: pender.pending['auth/CHECK'],
      logged: auth.logged,
      changed: editor.changed,
      thumbnail: editor.thumbnail,
      selectedId: category.selectedId,
    }),
    dispatch => ({
      EditorActions: bindActionCreators(editorActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch),
    })
  )
)(EditorHeaderContainer);
