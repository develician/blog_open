import * as React from 'react';
import styles from './PreviewPane.scss';
import * as classNames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';

const cx = classNames.bind(styles);

interface PreviewPaneProps {
  markdown: string;
  title: string;
}

const PreviewPane: React.SFC<PreviewPaneProps> = ({ markdown, title }) => {
  return (
    <div className={cx('PreviewPane')}>
      <h1 className={cx('Title')}>{title}</h1>
      <div>
        <MarkdownRender markdown={markdown} />
      </div>
    </div>
  );
};

export default PreviewPane;
