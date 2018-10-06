import * as React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { editorActions } from 'store/modules/editor';
import { authActions } from 'store/modules/auth';
import { categoryActions, Category } from 'store/modules/category';
import { State } from 'store/modules';
import EditorPane from 'components/editor/EditorPane';
import DropImage from 'components/editor/DropImage';

export interface EditorPaneContainerProps {
  EditorActions: typeof editorActions;
  AuthActions: typeof authActions;
  CategoryActions: typeof categoryActions;
  title: string;
  markdown: string;
  tags: string;
  history: any;
  pending: boolean;
  logged: boolean;
  categories: Category[];
  markdownImage: string;
}

class EditorPaneContainer extends React.Component<EditorPaneContainerProps> {
  public componentDidMount() {
    this.checkAdmin();
    this.getCategory();
    this.props.EditorActions.initialize();
  }

  public getCategory = async () => {
    const { CategoryActions } = this.props;

    try {
      await CategoryActions.categoryList();
    } catch (e) {
      console.log(e);
    }
  };

  public handleSelectCategory = id => {
    const { CategoryActions } = this.props;

    CategoryActions.selectCategory(id);
  };

  public handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { EditorActions } = this.props;
    EditorActions.changeInput({ name: e.target.name, value: e.target.value });
  };

  public handleChangeMarkdown = (value: string) => {
    const { EditorActions } = this.props;
    EditorActions.changeInput({ value, name: 'markdown' });
  };

  public checkAdmin = async () => {
    const { AuthActions } = this.props;

    try {
      await AuthActions.check();
    } catch (e) {
      console.log(e);
      this.props.history.goBack();
    }
  };

  public uploadImage = async image => {
    const { EditorActions } = this.props;

    try {
      await EditorActions.uploadImage({ file: image });
    } catch (e) {
      console.log(e);
    }
  };

  public handleClickImageButton = () => {
    const upload = document.createElement('input');
    upload.type = 'file';
    upload.onchange = e => {
      if (!upload.files) {
        return;
      }
      const file = upload.files[0];
      this.uploadImage(file);
    };
    upload.click();
  };

  public handleDragEnter = (e: any): void => {
    console.log('drag enter');
  };

  public handleDragLeave = (e: any): void => {
    console.log('drag leave');
  };

  public handlePasteImage = (file: any): void => {
    if (!file) return;
    console.log('handle paste image');
  };

  public handleDrop = (e: any) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (!files) return;
    this.uploadMarkdownImage(files[0]);
    // console.log('handleDrop', files[0]);
  };

  public uploadMarkdownImage = async (file: File) => {
    if (file.size > 1024 * 1024 * 10) return;

    const fileTypeRegex = /^image\/(.*?)/;
    if (!fileTypeRegex.test(file.type)) return;
    console.log('not filtered');

    const { uploadMarkdownImage } = this.props.EditorActions;

    try {
      await uploadMarkdownImage({ file });
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    const { title, markdown, tags } = this.props;
    if (!this.props.logged || this.props.pending) {
      return null;
    }
    return (
      <React.Fragment>
        <EditorPane
          categories={this.props.categories}
          title={title}
          markdown={markdown}
          tags={tags}
          onChangeInput={this.handleChangeInput}
          onChangeMarkdown={this.handleChangeMarkdown}
          onClickImageButton={this.handleClickImageButton}
          onSelectCategory={this.handleSelectCategory}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          markdownImage={this.props.markdownImage}
        />
        <DropImage
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onPasteImage={this.handlePasteImage}
          onDrop={this.handleDrop}
        />
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(
    ({ editor, pender, auth, category }: State) => ({
      title: editor.title,
      markdown: editor.markdown,
      tags: editor.tags,
      pending: pender.pending['auth/CHECK'],
      logged: auth.logged,
      categories: category.categories,
      markdownImage: editor.markdownImage,
    }),
    dispatch => ({
      EditorActions: bindActionCreators(editorActions, dispatch),
      AuthActions: bindActionCreators(authActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
    })
  )
)(EditorPaneContainer);
