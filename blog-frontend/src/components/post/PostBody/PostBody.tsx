import * as React from 'react';
import styles from './PostBody.scss';
import * as classNames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';

const cx = classNames.bind(styles);

interface PostBodyProps {
  markdown: string;
}

const PostBody: React.SFC<PostBodyProps> = ({ markdown }) => {
  return (
    <div className={cx('PostBody')}>
      <div className={cx('Paper')}>
        <MarkdownRender markdown={markdown} />
      </div>
    </div>
  );
};

export default PostBody;
