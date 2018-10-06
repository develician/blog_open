import * as React from 'react';
import styles from './Paper.scss';
import * as classNames from 'classnames/bind';
import Contents from '../Contents';

const cx = classNames.bind(styles);

// interface PaperProps {}

const Paper: React.SFC<{}> = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('introduction-paper')}>
        <Contents />
      </div>
    </div>
  );
};
export default Paper;
