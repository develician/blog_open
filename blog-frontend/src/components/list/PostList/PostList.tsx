import * as React from 'react';
import styles from './PostList.scss';
import * as classNames from 'classnames/bind';
import { Post } from 'store/modules/list';
import { Link } from 'react-router-dom';
import * as removeMd from 'remove-markdown';
import * as moment from 'moment';
import Masonry from 'react-masonry-component';

const cx = classNames.bind(styles);

interface PostItemProps {
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  id: string;
  thumbnail: string;
}

interface PostListProps {
  posts: Post[];
}

const PostItem: React.SFC<PostItemProps> = ({
  title,
  body,
  tags,
  publishedDate,
  id,
  thumbnail,
}) => {
  const tagList = tags.map(tag => (
    <Link key={tag} to={`/tag/${tag}`}>
      #{tag}
    </Link>
  ));

  // const isImageIncluded: boolean =

  return (
    <div className={cx('PostItem')}>
      <Link to={`/post/${id}`}>
        <div
          className={cx('Thumbnail')}
          style={{
            backgroundImage: `url(https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/${thumbnail})`,
          }}
        />
      </Link>
      <div className={cx('Non-Thumbnail')}>
        <h3>
          <Link to={`/post/${id}`}>{title}</Link>
        </h3>
        <div className={cx('Date')}>{moment(publishedDate).format('ll')}</div>
        <p>{removeMd(body)}</p>
        <div className={cx('Tags')}>{tagList}</div>
      </div>
    </div>
  );
};

const PostList: React.SFC<PostListProps> = ({ posts }) => {
  const postList = posts.map(post => {
    const { _id, title, body, tags, publishedDate, thumbnail } = post;
    return (
      <PostItem
        key={_id}
        id={_id}
        title={title}
        body={body}
        tags={tags}
        thumbnail={thumbnail}
        publishedDate={publishedDate}
      />
    );
  });
  return (
    <div className={cx('MasonryWrapper')}>
      <Masonry options={{ gutter: 16 }}>{postList}</Masonry>
    </div>
  );
  // return <div className={cx('PostList')}>{postList}</div>;
};

export default PostList;
