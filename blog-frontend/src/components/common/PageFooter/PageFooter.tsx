import * as React from 'react';
import styles from './PageFooter.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// interface PageFooterProps {}

const PageFooter: React.SFC<{}> = () => {
  return (
    <div className={cx('PageFooter')}>
      <Link to="/" className={cx('Logo')}>
        killi8n's Blog
      </Link>
    </div>
  );
};

export default PageFooter;
