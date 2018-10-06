import * as React from 'react';
import styles from './Pagination.scss';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const cx = classNames.bind(styles);

interface PaginationProps {
  page: number;
  tag: string;
  lastPage: number;
  category: string;
}

const Pagination: React.SFC<PaginationProps> = ({ page, tag, lastPage, category }) => {
  const createPagePath = (eventPage: number) => {
    if (tag) {
      return tag ? `/tag/${tag}/${eventPage}` : `/page/${eventPage}`;
    }
    if (category) {
      return category ? `/category/${category}/${eventPage}` : `/page/${eventPage}`;
    }
    return `/page/${eventPage}`;
  };
  return (
    <div className={cx('PaginationWrapper')}>
      <Button disabled={page === 1} to={createPagePath(page - 1)}>
        이전 페이지
      </Button>
      <div className={cx('Number')}>페이지 {page}</div>
      <Button disabled={page === lastPage} to={createPagePath(page + 1)}>
        다음 페이지
      </Button>
    </div>
  );
};

export default Pagination;
