import * as React from 'react';
import styles from './AdminLoginWrapper.scss';
import * as classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// interface AdminLoginWrapperProps {
// }

const AdminLoginWrapper: React.SFC<{}> = ({ children }) => {
  return <div className={cx('Wrapper')}>{children}</div>;
};

export default AdminLoginWrapper;
