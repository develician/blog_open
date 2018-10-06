import * as React from 'react';
import styles from './PostInfo.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const cx = classNames.bind(styles);

interface PostInfoProps {
  title: string;
  tags: string[];
  publishedDate: any;
  thumbnail: string;
}

const PostInfo: React.SFC<PostInfoProps> = ({ title, tags, publishedDate, thumbnail }) => {
  return (
    <div
      className={cx('PostInfo')}
      style={{
        backgroundImage: `url(https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/${thumbnail})`,
      }}
    >
      <div className={cx('Layer')}>
        <div className={cx('Info')}>
          <h1>{title}</h1>
          <div className={cx('Tags')}>
            {tags &&
              tags.map(tag => (
                <Link key={tag} to={`/tag/${tag}`}>
                  #{tag}
                </Link>
              ))}
          </div>
          <div className={cx('Date')}>{moment(publishedDate).format('ll')}</div>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
