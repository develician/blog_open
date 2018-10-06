import * as React from 'react';
import styles from './MenuItem.scss';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface MenuItemProps {
  to?: string;
  visible?: boolean;
  onClick?(): void;
}

const MenuItem: React.SFC<MenuItemProps> = ({ to, onClick, children, visible }) => {
  if (to) {
    return (
      <Link to={to} className={cx('MenuItem', { hidden: visible })}>
        {children}
      </Link>
    );
  }
  return (
    <div onClick={onClick} className={cx('MenuItem', { hidden: visible })}>
      {children}
    </div>
  );
};

export default MenuItem;
