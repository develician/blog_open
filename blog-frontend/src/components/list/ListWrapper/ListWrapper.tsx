import * as React from 'react';
import styles from './ListWrapper.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// interface ListWrapperProps {
// }

const ListWrapper: React.SFC<{}> = ({ children }) => {
  return <div className={cx('ListWrapper')}>{children}</div>;
};

export default ListWrapper;
