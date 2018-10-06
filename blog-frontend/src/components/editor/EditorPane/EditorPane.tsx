import * as React from 'react';
import styles from './EditorPane.scss';
import * as classNames from 'classnames/bind';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import FloatingImageButton from '../FloatingImageButton';
import { Category } from 'store/modules/category';

const cx = classNames.bind(styles);
// const { Pos } = process.env.APP_ENV === 'browser' && require('codemirror');

interface EditorPaneProps {
  title: string;
  markdown: string;
  tags: string;
  categories: Category[];
  markdownImage: string;
  onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeMarkdown(value: string): void;
  onClickImageButton(): void;
  onSelectCategory(id: string): void;
  onDragEnter(e: any): void;
  onDragLeave(e: any): void;
}

class EditorPane extends React.Component<EditorPaneProps> {
  public state = {
    cursorCoordsTop: 0,
    isOverFlowed: false,
    prevCoordsTop: 0,
    isInitialUpdate: true,
    // cursor: Pos(0, 0),
    cursor: {
      line: 0,
      ch: 0,
    },
  };

  public codeMirror: any;
  public cursor: any = null;
  private editor: any = null;

  public componentDidMount() {
    this.initializeEditor();
    window.addEventListener('beforeunload', this.setBeforeUnload);
  }

  public componentWillUnmount() {
    window.removeEventListener('beforeunload', this.setBeforeUnload);
  }

  public componentDidUpdate(prevProps: EditorPaneProps, prevState: any) {
    if (!this.codeMirror) {
      return;
    }

    if (prevProps.markdownImage !== this.props.markdownImage) {
      // this.setState({
      //   cursor: Pos(this.state.cursor.line + 1, 0),
      // });

      const { Pos } = require('codemirror');
      const insertText = `![](https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/${
        this.props.markdownImage
      })`;

      const doc = this.codeMirror.getDoc();
      doc.replaceRange(insertText, Pos(this.state.cursor.line, this.state.cursor.ch));

      this.setState({
        cursor: Pos(this.state.cursor.line + 1, 0),
      });
    }

    if (prevState.cursor !== this.state.cursor) {
      this.codeMirror.setCursor(this.state.cursor);
      return;
    }

    if (prevProps.markdown !== this.props.markdown) {
      if (!this.state.isInitialUpdate) {
        return;
      }

      // const { codeMirror, cursor } = this;
      if (!this.codeMirror) return;
      this.codeMirror.setValue(this.props.markdown);
      // console.log(this.cursor);
      // if (markdownImageAdded) {
      //   this.setState({
      //     cursor: Pos(this.state.cursor.line + 1, 0),
      //   });
      //   const insertText = `![](https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/${
      //     this.props.markdownImage
      //   }`;

      //   const doc = this.codeMirror.getDoc();
      //   doc.replaceRange(insertText, Pos(0, 0));
      // }
      // const scrollInfo = this.codeMirror.getScrollInfo();
      // console.log(scrollInfo);
      // if (scrollInfo.top !== 0) {
      //   this.codeMirror.scrollTo(scrollInfo.left, scrollInfo.top + scrollInfo.clientHeight / 2);
      // } else {
      //   this.codeMirror.scrollTo(scrollInfo.left, scrollInfo.top);
      // }
      this.setState({
        isInitialUpdate: false,
      });
    }
  }
  public handleChangeMarkdown = (doc: any) => {
    const { onChangeMarkdown } = this.props;
    // this.cursor = doc.getCursor();
    this.setState({
      cursor: doc.getCursor(),
    });
    onChangeMarkdown(doc.getValue());
  };
  public setBeforeUnload = e => {
    e.returnValue = '작성을 취소하고 이동하시겠습니까?';
  };

  public initializeEditor = () => {
    let CodeMirror;
    const isBrowser = process.env.APP_ENV === 'browser';
    if (isBrowser) {
      CodeMirror = require('codemirror');
      require('codemirror/mode/markdown/markdown');
      require('codemirror/mode/javascript/javascript');
      require('codemirror/mode/jsx/jsx');
      require('codemirror/mode/css/css');
      require('codemirror/mode/shell/shell');
    }
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
    });
    this.codeMirror.on('change', this.handleChangeMarkdown, 300);
    this.codeMirror.on('dragenter', (event, e) => this.props.onDragEnter(e));
    this.codeMirror.on('dragleave', (event, e) => this.props.onDragLeave(e));
    this.codeMirror.on('paste', (event, e) => this.handlePaste(e));
  };

  public handleSelectCategory = e => {
    this.props.onSelectCategory(e.target.value);
  };

  public handlePaste = e => {
    console.log('handle paste');
  };

  public render() {
    const { title, onChangeInput, tags } = this.props;

    const categoryList = this.props.categories.map((category, i) => {
      return (
        <option key={category._id} value={category._id}>
          {category.category}
        </option>
      );
    });
    return (
      <div className={cx('EditorPane')}>
        <input
          className={cx('Title')}
          placeholder="제목을 입력하세요."
          name="title"
          value={title}
          onChange={onChangeInput}
        />
        <div className={cx('CodeEditor')} ref={ref => (this.editor = ref)} />
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={onChangeInput}
          />
        </div>
        <div className={cx('category')}>
          <div className={cx('description')}>카테고리 지정</div>
          <select onChange={this.handleSelectCategory}>{categoryList}</select>
        </div>
        <FloatingImageButton onClick={this.props.onClickImageButton} />
      </div>
    );
  }
}

export default EditorPane;
