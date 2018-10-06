import * as React from 'react';
import styles from './MarkdownRender.scss';
import * as classNames from 'classnames/bind';
import debounce from 'lodash/debounce';

import * as marked from 'marked';

// prism 관련 코드 불러오기
import * as Prism from 'prismjs';
// import './md-dracular.scss';
import './okaidia.css';

// let Prism;

// 지원 할 코드 형식들을 불러옵니다
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

// if (process.env.APP_ENV === 'browser') {
//   // Prism = require('prismjs');
//   // import 'prismjs/components/prism-bash.min.js';
//   // require('prismjs/components/prism-javascript.min.js');
//   // require('prismjs/components/prism-r.min.js');
//   // require('prismjs/components/prism-python.min.js');
//   // require('prismjs/components/prism-jsx.min.js');
//   // require('prismjs/components/prism-css.min.js');
//   // Prism.highlightAll();
//   // Prism.
//   // this.renderMarkdown();
// }

const cx = classNames.bind(styles);

interface MarkdownRenderProps {
  markdown: any;
}

class MarkdownRender extends React.Component<MarkdownRenderProps, any> {
  public htmlDiv;

  public componentDidMount() {
    this.debounceRender();
  }

  public componentDidUpdate(prevProps: MarkdownRenderProps, prevState: any) {
    if (prevProps.markdown !== this.props.markdown) {
      this.debounceRender();
      console.log('render');
    }
  }

  public renderMarkdown = () => {
    const { markdown } = this.props;

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight(code, lang: string) {
        return Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang as any);
      },
    });
    this.htmlDiv.innerHTML = marked(markdown);

    this.debounceRender = debounce(this.renderMarkdown, 300);
  };

  public debounceRender = () => {
    this.renderMarkdown();
  };

  public render() {
    return (
      <div
        className={cx('MarkdownRender')}
        // dangerouslySetInnerHTML={markup}
      >
        <div
          ref={ref => {
            this.htmlDiv = ref;
          }}
        />
      </div>
    );
  }
}

export default MarkdownRender;
